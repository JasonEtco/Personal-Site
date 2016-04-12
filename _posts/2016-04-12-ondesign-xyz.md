---
layout: post
title: OnDesign.xyz
tag: Web and Front-End
description: I built this website to take great articles about design, written by brilliant designers, and add the detail that they deserve.
shortname: ondesign
link: http://ondesign.xyz

# shadow 	 - creates a box-shadow
# rounded 	 - border-radius: 5px
# full-width - removes max-width to be 100%

# flex       - applicable on div wrapper
---
{% capture imagePath %}/assets/case-studies/{{ page.shortname }}/{{ page.shortname }}{% endcapture %}

### A Writer's Shortcoming

There are so many great designers who put their teachings and thoughts into well written articles, attempting to teach and inspire their peers or global mentees. Unfortunately, these designers are busy making great work for their clients and can't put in the time to add visual detail to their writings. Fortunately, I can (and did).

<div class="flex rounded shadow">
	<img src="{{ imagePath }}_index.png" alt="{{ page.title }}">
	<img src="{{ imagePath }}_iA.png" alt="{{ page.title }}">
</div>

### Typography

There is not a single image in the whole website; keeping it sans-photo focuses on the content, which is of course the most important part of the site. This means that the typographic choices needed to be very well-considered.

<div>
	<img src="{{ imagePath }}_type.png" alt="{{ page.title }}">
</div>

### The Devil's in the Details

Especially in Bruce Mau's [Incomplete Manifesto for Growth](http://ondesign.xyz/articles/incomplete-manifesto-for-growth/#12), there are many places to include small visual details that add to the content. Small animations, tiny interactions; things that lend a visually understandable aspect to Bruce Mau's words.

<div>
	<video preload="metadata" loop autoplay tabindex="0">
		<source src="{{ imagePath }}_manifesto.webm" type="video/webm">
		<source src="{{ imagePath }}_manifesto.mp4" type="video/mp4">
		<p>Your browser does not support the video tag.</p>
	</video>

	<video preload="metadata" loop autoplay tabindex="0">
		<source src="{{ imagePath }}_manifesto-2.webm" type="video/webm">
		<source src="{{ imagePath }}_manifesto-2.mp4" type="video/mp4">
		<p>Your browser does not support the video tag.</p>
	</video>
</div>

### Custom code

Because each article is so different, it's impossible to have such well-considered interactions that span across every article. I wrote separate JavaScript functions and CSS styles for some of the content to give it that "one-of-a-kind" feel.  
[See the code right here.](https://github.com/JasonEtco/type-texts)

<div class="flex rounded shadow">
	<img src="{{ imagePath }}_code.jpg" alt="{{ page.title }}">
	<img src="{{ imagePath }}_timer.jpg" alt="{{ page.title }}">
</div>

### Scalability

Just because each article requires custom code, that doesn't mean the commonalities should be ignored. DRY thinking was still applicable to many of the typographic and layout-based decisions.

<video crossorigin="anonymous" preload="metadata" loop autoplay tabindex="0" class="full-width">
	<source src="{{ imagePath }}_app.webm" type="video/webm">
	<source src="{{ imagePath }}_app.mp4" type="video/mp4">
	<p>Your browser does not support the video tag.</p>
</video>

### To really appreciate it:
[View the live site here](http://ondesign.xyz)

*[DRY]: Don't Repeat Yourself