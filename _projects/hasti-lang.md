---
title: Hasti-Lang
icon: fe fe-file
is-oss: true
source-link: https://github.com/hasti-lang
---

# Hasti-Lang
Hasti-lang is an **educational Persian programming language** developing by me to be used in [Hasti Studio](/projects/hasti-studio).
This language supports functional and object-oriented paradigms with a ML-like syntax.

{% include cards/alert.html class="warning" body="This project is under development." %}


<pre dir="rtl" style="direction: rtl;text-align: right;font-family: vazir code">
آرین : ماژول =

استفاده سیستم.شبکه
استفاده سیستم.ریاضیات
استفاده سیستم.ورودی‌خروجی

انسان : نوع = 
	نام : متن
	نام‌خانوادگی : متن
	سن : عدد صحیح
	برادر : شاید انسان

ابرانسان : نوع = انسان با (قدرت‌‌خارق‌العاده : متن)

شخص1 = {
	نام = "محسن"
	نام‌خانوادگی = "مهدی نیا"
	سن = 20
	برادر = بی‌مقدار
	}

عدد1 : عدد صحیح = 10
عدد2 : عدد اعشاری = 12.0
عدد3 : عدد مختلط = 10 + 3 <مبهم>

داده : بایت = 00001111

محاسبه‌گر : انسان ← عدد مختلط = انسان.سن + <مبهم>

شکل‌کارت : نوع = | گشنیز
		        | خشت
		        | دل
		        | پیک

ارزش‌کارت : نوع = | شاه
		         | بی‌بی
		         | سرباز
		         | آس
		         | عددی : عدد صحیح [0..10]

کارت : نوع = (ارزش‌کارت * نوع‌کارت)

کارت1 = کارت (آس ، پیک)
کارت2 = کارت (عددی 10، خشت)

نام‌های‌مجاز : لیست متن = ["آرین"، "پرهام"، "مصطفی"]

یه‌عددی = اگر کارت1 == (_، خشت) آنگاه 10 وگرنه 20
جمع = برای عدد در [0..10] قدم 2
	بنویس عدد
