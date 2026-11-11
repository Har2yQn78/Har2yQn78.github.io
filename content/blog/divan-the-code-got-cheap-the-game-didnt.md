---
title: "The Code Got Cheap. The Game Didn't."
date: "2026-11-11"
excerpt: "I finally started the game. Coding agents carried me past the wall that stopped me last time, and my friend's first playtest showed me how many walls were still standing behind it."
tags: ["story", "gamedev", "ai"]
---

My friend played the prototype and didn't know what to do after they won.

That was the first real piece of feedback Divan ever got. Not a bug report, not a crash. They finished a round, the game stopped explaining itself, and they sat there looking for the next thing. There wasn't one. I'd built the win, and never built what comes after it.

I'd been so focused on getting it to work that I never thought about what the player would see. The game worked. That wasn't the problem anymore.

## The wall I wrote about fell fast

A few months ago I wrote that [programming was the easy part of the game](/blog/programming-is-the-easy-part). I came into game development through the code, hit character design, then level design, then everything behind them, and set the project down. The code was the foothill. Everything else was the mountain.

I'm back on it now. The game is called Divan, and it's built on Hokm, the Persian trick-taking card game: two teams, one trump suit, and a lot of quiet table talk about who should have played what. The idea is to take that table and turn it into something you fight your way through.

This time I'm not writing most of the code by hand. Codex and Claude Code write it, in [Godot](/blog/godot-not-unity-this-time), and I direct, read, and decide. The prototype came together faster than anything I've ever started. Things that would have cost me weeks of evenings the first time around just showed up.

So the first wall, the one I was proud of being able to climb, is now barely a wall. Which should have felt like a shortcut to the finish. It felt more like getting to the top of the foothill quickly and seeing the whole mountain from there.

## C#, not GDScript, this time

I have to correct myself here, because I said the opposite in public. In the Godot post I picked GDScript and liked how close it felt to Python. Divan is in C#.

The reason is the parts of this game that aren't just moving a sprite. The bots that play cards against you and with you. Items that change the rules of a hand. Behaviors that stack on each other in ways I need to be able to reason about. For that, I wanted static types and a language where an item's behavior is a clear, typed thing the compiler checks, not something I find out about at runtime. When an agent writes a few hundred lines in one go, I want the compiler checking them too, not only me.

And here's the honest part about my own C#: it's still not deep. [It never was.](/blog/i-dont-collect-tools-i-follow-problems) I don't need to know every corner of the syntax anymore, and I'm not trying to. But I do need to be familiar enough to read what the agent wrote and know whether it's what I asked for. That's a different bar than writing it myself. It's lower in one way and higher in another. You can skip the syntax. You can't skip understanding what the code does.

## The art, too, mostly

The part that surprised me more was the art.

Last time I was stuck at four-bit. Flat where it should have depth, muddy where it should read clean, and I couldn't say why. This time I've been using Claude and Codex for pixel art, and it helps a lot. Sprites I'd never have managed on my own come out usable. Bad pixels get fixed. The gap between what I can see is wrong and what I can actually make is a lot smaller than it was.

But it helps with assets, not direction. It can make a card, a frame, a character. It can't tell me what Divan should look like, what mood the table should have, or why one sprite feels alive and another just sits there. That decision is still mine, and I still don't have the training for it. The tool closed the gap between taste and execution. It didn't give me taste.

## The prototype isn't the game in my head

There's a strange gap that opens up when building gets this fast.

In my head, Divan is finished. Not in detail, but in feeling: a table, a mood, opponents with a presence, a run that pulls you back in. That version has no rough edges because it has no edges at all. It's never had to exist.

The prototype has edges everywhere. It's a small slice, built quickly and tested enough to run, and it's very different from what I'd imagined. Some of that is just what a prototype is. But some of it is more uncomfortable than that: when I asked an agent for the thing in my head, it built exactly what I asked for, and that showed me how little of the thing in my head I had actually decided.

That's the part I didn't expect. When code was slow, the gap between the idea and the build stayed hidden for weeks, because I was busy building. Now the build arrives almost right away, and the gap is right there on screen. Every place the prototype feels wrong is a decision I hadn't made yet. The agent didn't get those wrong. It filled them with something reasonable, because I'd left them blank.

So I stopped treating the prototype as a first draft of the game. It's closer to a list of questions. Each rough spot points at something I still have to decide, and the fastest way to find out which ones matter was to put it in front of someone else.

## What my friend actually found

Back to the playtest, because that's where the post really starts.

I sent it early, on purpose, because I wanted feedback on the idea before I spent months on the wrong one. Here's roughly what came back:

- The game feel was lost. It ran, but it didn't feel like anything.
- Nothing was explained. Not the rules, not the items, not what anything did.
- The UX barely guided the player at all. After a win, you had to figure out on your own what to do next.
- It felt easy, even though I'd tried to make it hard.

Look at that list again. There isn't a single line of code in it. Every item is a design problem. You can't ask an agent to fix "the game feel was lost," because nobody, me included, has decided yet what the game is supposed to feel like. You can't generate onboarding for rules you haven't settled. And "it felt easy even when I tried to make it hard" is the one that stung, because it means difficulty isn't a number I turn up. It's something I don't understand yet.

The agents made it cheap to build the wrong thing quickly. That's genuinely useful. It's also exactly why the feedback came back the way it did: the expensive part was never in the build.

## The bots are where I can't look away

There's one place where the code being cheap doesn't mean I can stop understanding it, and it's the AI inside the game.

Hokm is played two against two. Which means in Divan, your partner is a bot too. A bad opponent is just easy. A bad partner is infuriating. It overtrumps a trick you'd already won, leads the suit you obviously needed held. Players will forgive a lot from an enemy and almost nothing from a teammate. Making a partner that feels like someone who's actually playing with you is a design question first and an AI question second, and I can't hand either half off.

Then the bosses. A boss in a card game isn't a health bar, it's a different way of playing the hand, maybe one that bends the table's rules. What it does, when it does it, and whether the player can read it coming, that's the boss fight. The agent can write the behavior. It can't decide what the behavior should be.

And fairness sits under all of it. A card bot can be made unbeatable by letting it see your hand. It can be made beatable by having it play badly on purpose. Neither feels good. The difficulty my friend said was missing lives right here, in bots that feel sharp without cheating, and I need to understand that logic myself, line by line if I have to, because I'm the one who has to tune it.

It's the same thing I wrote about in [Who Trains the Next Senior](/blog/Who-trains-the-next-senior). The agent does the typing. The judgment still has to come from somewhere, and in this game it has to come from me.

## Roguelike, boss rush, or something else

I don't know yet what shape Divan is.

The current plan is a roguelike: a run through a series of Hokm tables, picking up items between hands that change the rules, losing it all and starting over. But it might work better as a boss rush, a fixed set of opponents at the table, each one a puzzle in how they play, no runs, no randomness in the structure. Or it might keep the roguelike loop and change almost everything else. Or change a lot more than that.

Those aren't cosmetic differences. A roguelike needs a reason to keep going after you lose, and a loop that's still interesting the fiftieth time. A boss rush needs each fight to carry the whole game on its own. They ask completely different things of the same card game, and I can't pick between them by building both fast and seeing which compiles. Both will compile. The question is which one is worth playing, and that's a different kind of question.

## Slowly, on purpose

So I'm learning this side the slow way.

I've already played the games in this space. The two that pull at me most are Balatro and Inscryption. Balatro took a card game everyone already knows and made breaking its rules the whole point. Inscryption made a card table feel like a place, with someone sitting across from you. Divan wants a little of both. But having played them isn't the same as knowing why they work, and that's the part I'm going back for. How they teach a rule without a wall of text. How they make the next run feel tempting right after you lose one. Where they put the difficulty, and how they hide it. I'm also watching GDC talks and reading about game design, game feel, and onboarding, the knowledge that lives in people who've shipped games, not in a codebase.

It's slow, and I'm letting it be slow. For years my method has been to take a system apart until it gives up its seams. Design still doesn't have seams I can find by force. But it does have people who've written down how they think about it, and games I can play with a notebook open instead of a controller-only brain. That's a climb I can actually start.

## So

Last time, the code was the foothill and I stopped at the base of the mountain. This time, the agents carried me up the foothill faster than I could have walked it. The mountain is exactly the same size.

That's the honest version of what AI changed for me in gamedev. It didn't make the game cheap. It made the code cheap, which made the real cost of the game impossible to ignore: the loop, the feel, the fight, the look, the moment after a win where a player either knows what to do next or doesn't.

My friend didn't know what to do after they won. Neither did I, really. Now I'm working on that part.
