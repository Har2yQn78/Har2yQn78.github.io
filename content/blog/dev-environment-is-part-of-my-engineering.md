---
title: "My Development Environment Is Part of My Engineering"
date: "2026-06-28"
excerpt: "I don't customize my setup to make it pretty. I do it because every config I rewrite teaches me how my machine actually works, and because friction is the enemy of thinking clearly."
tags: ["engineering", "tools"]
---

People see my setup and assume it's vanity. A tiling window manager, a terminal that never closes, a config folder I've rebuilt more times than I can count. It looks like decoration. It isn't.

My development environment is not a costume I put on over my engineering. It is part of the engineering. The same instinct that makes me break a problem into pieces makes me take my tools apart to see what they're made of. I don't optimize because I need to. I optimize because every improvement teaches me something I couldn't have learned any other way.

This is the story of how my setup stopped being a desktop and started being a way of thinking.

## Linux taught me what a computer actually is

For years I used computers the way most people do: as appliances. Things turned on, windows appeared, programs ran, and I never once asked how. The machine was a sealed box, and I was a tourist inside it.

Linux ended that.

The first time something broke and there was no menu to fix it, I had to learn what was underneath. Not the polished surface, the actual machinery. What a process is. What the kernel does and what it refuses to do. How a file isn't really a file but a handle the system hands you. Why a permission bit can stop a program cold. I learned these things not from a course, but because my own machine wouldn't work until I understood them.

That's the trade Linux offers. It hands you the responsibility of understanding, and in return it hands you the machine. Nothing is hidden because nothing is allowed to be. The operating system stopped being a wall between me and the hardware and became something I could read, top to bottom, if I was willing to look.

I was willing to look. And once you've seen how an operating system actually fits together, you can't unsee it. Every program you write after that sits on top of a system you finally understand instead of one you're just hoping cooperates.

## Living in the terminal made the machine smaller

The terminal scared me before it freed me.

A blinking cursor with no buttons feels hostile until you realize what it actually is: the most honest interface a computer has. There's no guessing where the option is buried in a menu. You say what you want, in words, and the machine does exactly that and nothing else. The terminal doesn't interpret your intentions. It executes them. That precision is the whole point.

The longer I lived there, the smaller and more knowable my computer became. A graphical app is a black box with a few buttons poking out. A command is transparent. I can read it, change one flag, and watch the behavior change. I started to understand my system not as a collection of apps but as a set of small, composable tools I could chain together however the moment required.

And then the automations started.

It always began with an annoyance. Some tiny task I did three times a day, by hand, that I was tired of doing. Renaming a batch of files. Spinning up the same project scaffold. Checking the same three things before a deploy. Each one was too small to matter on its own and exactly the right size to turn into a script.

Shell scripting didn't arrive as a subject I sat down to study. It arrived one tiny frustration at a time. I'd automate the thing that annoyed me today, learn one new piece of the shell doing it, and keep that piece forever. A year of that and I'd quietly learned a language by using it, never by drilling it. The daily friction was the curriculum.

That's the part people miss about automation. It isn't really about the time saved, though the time adds up. It's that every annoyance you remove is one less thing standing between you and the actual work. Automation clears the small debris out of the road so your attention can stay on the thing that's hard.

## A tiling window manager rewired how I multitask

I didn't expect a window manager to change how I think. It did.

Before, my screen was a mess of overlapping windows I spent half my day dragging, resizing, and hunting through. The work of managing the windows had quietly become part of the work itself, and I'd stopped noticing the tax.

A tiling window manager took that away. Windows arrange themselves. Every layout is deliberate because I defined it. Nothing overlaps, nothing hides, and I never reach for the mouse to dig a buried window out from under three others. The machine handles the placement so I can handle the thinking.

But the deeper change was about my hands.

Reaching for the mouse is a context switch you don't feel until you remove it. Every time you move your hand off the keyboard to point and click, you take a small step out of the flow you were in. Do it a few hundred times a day and you've been pulled out of focus a few hundred times. I never noticed that cost until it was gone.

So I built muscle memory instead. Switch workspaces, move windows, launch what I need, all without my hands leaving home. The actions stopped being decisions and became reflexes. When the mechanics disappear into muscle memory, what's left is just the intent. You think the move, and it happens.

That's the rule I hold every keybinding to: it has to solve a real problem. Not exist because it's clever, not because someone else uses it. If a binding doesn't remove a real friction I feel every day, it's clutter, and clutter is just a different kind of mess. The good ones earn their place by disappearing. I stop thinking about the keys and start thinking through them.

## Curiosity is the real reason

If I'm honest, none of this was ever strictly necessary.

I could have used the defaults. I could have pointed and clicked and shipped the same code. Plenty of excellent engineers do, and their tools never get in their way. So I have to be honest about the real reason I keep tearing my setup apart and putting it back together.

It's curiosity. Not productivity.

Every customization forced me to learn something I'd otherwise have skipped. To rebind a key I had to understand the input system. To fix the window manager I had to read its config language and the model underneath it. To write the automation I had to understand the tools I was gluing together. The setup was never the destination. It was the excuse to look one level deeper, and looking one level deeper is the only thing that's ever made me better.

This is why I want to understand every line of my config. Not most of it, every line. A setting I copied without understanding is a small lie I'm telling myself about how my system works, and those lies have a way of breaking at the worst possible moment. If a line is in my config, I want to know why it's there and what happens if it leaves. That standard is exhausting and I wouldn't trade it. It's the difference between owning your tools and renting them.

Because that's the thing tools don't do: they don't make you good. A beautiful setup doesn't write better code, and the right editor won't save a muddled idea. Good tools don't make you productive. Understanding them does. The productivity is a side effect of the understanding, never the other way around.

## So

The goal was never a beautiful desktop. The screenshots are a side effect. The real goal is to remove the friction between my thinking and the machine, so that the only hard part left is the part that's supposed to be hard: the problem itself.

My setup isn't how I decorate my computer. It's a record of how I solve problems. Every binding is a friction I noticed and refused to live with. Every script is an annoyance I decided to kill. Every config line is something I made myself understand instead of accept.

It's the same loop from everything else I've ever built. Notice what's wrong, take it apart, change one piece, try again. The contraption just happens to be the computer itself this time.

I don't have a finished setup, and I never will. That was never the point. The point is that every time I reach into it, I come out understanding my machine a little better than I did. A tool you understand completely stops being a tool you use and becomes a tool you think with.

That's why I invest the time. Not for the desktop. For what building it keeps teaching me.
