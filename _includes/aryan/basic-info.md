{% assign aryan = site.data.users[0] %}
Age: <span id="year-of-birth"></span> years old (as of <span id="now"></span>)

Personal: [{{aryan.email}}](mailto:{{aryan.email}}?subject=Contact Aryan Ebrahimpour)<br>
Academic: [{{aryan.uniemail}}](mailto:{{aryan.workemail}}?subject=Contact Aryan Ebrahimpour)<br>
Work: [{{aryan.workemail}}](mailto:{{aryan.workemail}}?subject=Contact Aryan Ebrahimpour)

<div class="btn-list">
    <a target="_blank" href="https://stackoverflow.com/users/7825034/aryan?tab=profile" class="btn btn-secondary btn-sm"><i class="fa fa-stack-overflow"></i> Stack Overflow</a>
    <a target="_blank" href="https://github.com/0xaryan" class="btn btn-secondary btn-sm"><i class="fe fe-github"></i> GitHub</a>
    <a target="_blank" href="https://twitter.com/0xaryan" class="btn btn-secondary btn-sm"><i class="fe fe-twitter"></i> Twitter</a>
    <a target="_blank" href="https://www.linkedin.com/in/0xaryan/" class="btn btn-secondary btn-sm"><i class="fe fe-linkedin"></i> LinkedIn</a>
    <a target="_blank" href="https://t.me/Oxaryan" class="btn btn-secondary btn-sm"><i class="fa fa-telegram"></i> Telegram</a>
</div>

<script>document.addEventListener("DOMContentLoaded", function(event) { const birthday = new Date("22 Dec 1997");const ageDifMs = Date.now() - birthday.getTime();const ageDate = new Date(ageDifMs);const result =  Math.abs(ageDate.getUTCFullYear() - 1970);document.getElementById("year-of-birth").innerHTML = result; const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; const now = new Date(Date.now()); const d = now.getDate(); const m = months[now.getMonth()]; const y = now.getFullYear(); document.getElementById("now").innerHTML = `${d} ${m} ${y}`});</script>
