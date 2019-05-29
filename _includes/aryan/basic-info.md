{% assign aryan = site.data.users[0] %}
Age: <span id="year-of-birth"></span>

Email: [{{aryan.email}}](mailto:Oxaryan@outlook.com.com?subject=Contact Aryan Ebrahimpour)

<script>document.addEventListener("DOMContentLoaded", function(event) { const birthday = new Date("22 Dec 1997");const ageDifMs = Date.now() - birthday.getTime();const ageDate = new Date(ageDifMs);const result =  Math.abs(ageDate.getUTCFullYear() - 1970);document.getElementById("year-of-birth").innerHTML = result;});</script>