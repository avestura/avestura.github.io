---
layout: post
title: Using Tor outside of the Tor Browser
description: This post shows how to run Tor with a simple PowerShell script and use it in other apps like Telegram...
image: assets/images/posts/tor-logo.png
categories: []
tags: [Tor, PowerShell]
comments: true
language: english
---

If you love [Tor project](https://www.torproject.org/download) and use it a lot, you might want to know if it is possible to run Tor from command line instead of the browser, or to use its services not just in Tor browser, but in other apps as well.

In this blog post I'm going to explain how to write a simple [PowerShell](https://github.com/PowerShell/PowerShell) script that helps you run Tor by simply invoking the hand-made `freedom` command, and use it in apps like [Telegram Messenger](https://telegram.org/).

I first explain how to write startup modules for your Powershell, then we'll write the script and use the Tor in Telegram at the end.

I am using **PowerShell Core** in this post, but you can use __Windows PowerShell__ as well.

## Getting PowerShell Ready
#### Setting PowerShell Execution Policy
Execution Policy in PowerShell is a security feature that prevent user from running malicious scripts. You might need to change execution policy in order to run some commands. Run this code to change your policy to `RemoteSigned` mode:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```
If you want to learn more about these policies, [read here](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-6).

#### Creating a Profile script
Using Profiles, you can customize your environment and run and define special elements in current session or permenantly. You can also define and run scripts for all users on all PowerShell hosts (including VSCode PowerShell Host, PowerShell ISE, etc).

The `$profile` varibale is automatically defined in your PowerShell host. If you write `$profile` in your PowerShell, it will output a path.
```powershell
Windows PowerShell> $profile
C:\Users\Aryan\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```
```powershell
PowerShell Core> $profile
C:\Users\Aryan\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```
As you see, it returns different path for **Windows PowerShell** and **PowerShell Core**. For the rest of the post, I'll only use the PowerShell Core, but as I said above, you can use Windows PowerShell too.

Above `$profile` paths are showing __Current Host__ for __Current User__ profile.
We want to define our scripts in a file for **All Hosts** and **All the Users**, to get the path for that profile, run this:
```powershell
~/Aryan> $profile.AllUsersAllHosts
C:\Program Files\PowerShell\6\profile.ps1
```
The profile location is `C:\Program Files\PowerShell\6\profile.ps1`, so we need to create the `profile.ps1` in folder `C:\Program Files\PowerShell\6\` if it isn't already there. Anything we write there will run in every PowerShell host for all users, so as you might guessed, we will define our `freedom` there.

#### Separating startup modules
Because I want to easily access my PS profile scripts, I create a folder called `MyPowershellScripts` in drive `C`, and write my codes there, then I'll import them in the `profile.ps1`.
So, create a file called `Start-Tor.ps1` in `C:\MyPowershellScripts` and then Import it using the `dot (.)` syntax.

```powershell
# Contents of "C:\MyPowershellScripts\Start-Tor.ps1":

Write-Host "Hello World!"
```
```powershell
# Contents of "C:\Program Files\PowerShell\6\profile.ps1":

. C:\MyPowershellScripts\Start-Tor.ps1
```

Now if you open a PowerShell host, you see the "Hello World" message, which means we're at the excpected position.

## The `freedom` script
Now we are ready to define our function inside the `Start-Tor.ps1` file, and we are sure that PowerShell loads our function everytime it starts.

After you download and install the [Tor Browser](https://www.torproject.org/download), it not only installs the Browser, but also an executable file called `tor.exe` which runs alongside its parent (the Tor Browser in general).

Here we want to run `tor.exe` which serves the Tor services on a port (usually 9150), and use the PowerShell host as parent instead of the Tor Browser, so we need the Process ID of the current host (and we already have that with `$pid` variable).

#### Start-Tor Script
```powershell
function Start-Tor {

    # Configuration
    $torBrowser     = "D:\Tor Browser"       # Put address of root folder of Tor Browser here
    $TOR_Password   = "YourPasswordHere"     # Input Tor network password here
    $TOR_HOST       = "127.0.0.1"            # Host of local Tor network
    $TOR_PORT       = 9150                   # The port number where Tor runs
    $CTRL_PORT      = 9151                   # The controller port number of Tor

    # Do not modify these
    $tor_location   = "$torBrowser\Browser\TorBrowser\Tor"
    $torrc_defaults = "$torBrowser\Browser\TorBrowser\Data\Tor\torrc-defaults"
    $torrc          = "$torBrowser\Browser\TorBrowser\Data\Tor\torrc"
    $tordata        = "$torBrowser\Browser\TorBrowser\Data\Tor"
    $geoIP          = "$torBrowser\Browser\TorBrowser\Data\Tor\geoip"
    $geoIPv6        = "$torBrowser\Browser\TorBrowser\Data\Tor\geoip6"
    $torExe         = "$tor_location\tor.exe"
    $controllerProcess = $PID
    function Get-OneToLastItem { param ($arr) return $arr[$arr.Length - 2]}

    Write-Host "Generating hash for your Tor password..."
    $TOR_HashPass_RAW  = & "$torExe" --hash-password $TOR_Password | more
    $Tor_HashPass      = Get-OneToLastItem($TOR_HashPass_RAW)

    $TOR_VERSION_RAW   = & "$torExe" --version | more
    $Tor_Version       = Get-OneToLastItem($TOR_VERSION_RAW)

    Write-Host "Running $Tor_Version" -ForegroundColor DarkGray
    Write-Host "Press [Ctrl+C] to stop Tor service."
    & "$torExe" --defaults-torrc $torrc_defaults -f $torrc DataDirectory $tordata GeoIPFile $geoIP GeoIPv6File $geoIPv6 HashedControlPassword $Tor_HashPass +__ControlPort $CTRL_PORT +__SocksPort "${TOR_HOST}:$TOR_PORT IPv6Traffic PreferIPv6 KeepAliveIsolateSOCKSAuth" __OwningControllerProcess $controllerProcess | more
    
}
```

All you need to do is to put suitable configs in the Configuration section of the script. Put the root installation folder of Tor Browser in `$torBrowser` varibale, and set your password for the current local Tor network using the `$TOR_Password`.

#### Setting an alias
Alias naming is fun (and sometimes dangerous!). At the end of the `Start-Tor.ps1` and after the function declaration you can alias `Start-Tor` to `freedom`, so you can run Tor easier!

```powershell
Set-Alias freedom Start-Tor
```

Now if you run `freedom` command, you should see an output like this:
```
~/Aryan> freedom
Generating hash for your Tor password...
Running Tor version 0.3.5.8 (git-5030edfb534245ed).
Press [Ctrl+C] to stop Tor service.
May 13 22:52:46.018 [notice] Tor 0.3.5.8 (git-5030edfb534245ed) running on Windows 8 [or later] with Libevent 2.1.8-stable, OpenSSL 1.0.2q, Zlib 1.2.11, Liblzma N/A, and Libzstd N/A.May 13 22:52:46.019 [notice] Tor can't help you if you use it wrong! Learn how to be safe at https://www.torproject.org/download/download#warning
May 13 22:52:46.021 [notice] Read configuration file "D:\Tor Browser\Browser\TorBrowser\Data\Tor\torrc-defaults".
May 13 22:52:46.022 [notice] Read configuration file "D:\Tor Browser\Browser\TorBrowser\Data\Tor\torrc".
May 13 22:52:46.026 [notice] Opening Socks listener on 127.0.0.1:9150
May 13 22:52:46.026 [notice] Opened Socks listener on 127.0.0.1:9150
May 13 22:52:46.026 [notice] Opening Control listener on 127.0.0.1:9151
May 13 22:52:46.026 [notice] Opened Control listener on 127.0.0.1:9151
May 13 22:52:46.000 [notice] Parsing GEOIP IPv4 file D:\Tor Browser\Browser\TorBrowser\Data\Tor\geoip.
May 13 22:52:46.000 [notice] Parsing GEOIP IPv6 file D:\Tor Browser\Browser\TorBrowser\Data\Tor\geoip6.
May 13 22:52:46.000 [notice] Bootstrapped 0%: Starting
May 13 22:52:47.000 [notice] Starting with guard context "default"
May 13 22:52:48.000 [notice] Bootstrapped 10%: Finishing handshake with directory server
May 13 22:52:48.000 [notice] Bootstrapped 80%: Connecting to the Tor network
May 13 22:52:49.000 [notice] Bootstrapped 90%: Establishing a Tor circuit
May 13 22:52:50.000 [notice] Bootstrapped 100%: Done
```
Tor now initialized, created a Tor circuit and running on `127.0.0.1:9150`.

## Using Tor in a 3rd-Party app

Now that we know Tor is running on `127.0.0.1:9150`, we can create a SOCKS5 Proxy in Telegram and use our local Tor services there.

**1- Click on the Connecting button in bottom-left corner**

![Connecting Proxy Telegram Image](/assets/images/posts/tor-post/connecting.jpg)

**2- Click on the "Use custom proxy" radio in Proxy Settings Menu**

![Proxy Settings Telegram Image](/assets/images/posts/tor-post/proxy-settings.jpg)

**3- Now create a new SOCKS5 proxy in Edit Proxy panel**

![Edit Proxy Telegram Image](/assets/images/posts/tor-post/edit-proxy.jpg)

**4- Save and enjoy Tor in Telegram**

![Connected Telegram Image](/assets/images/posts/tor-post/connected.jpg)