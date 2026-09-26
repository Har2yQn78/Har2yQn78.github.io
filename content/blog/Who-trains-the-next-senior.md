---
title: "Who Trains the Next Senior"
date: "2026-09-26"
excerpt: "I got good at judging code partly because I spent years being slow and wrong at writing it. I'm not sure that path exists anymore, and I don't think that's a small problem."
tags: ["coding", "engineering", "ai"]
---

Most of my day used to be measured in lines written. Now it's measured in decisions made.

I still write code. But more of my time now looks like reading a diff an agent produced, deciding whether the approach is right, and either shipping it or sending it back with a reason. The typing got cheap. The judging didn't. That should feel like a straightforward win, and most days it does. But there's a question sitting underneath it that I can't fully answer, and I've stopped trying to resolve it into something comfortable.

## The part that used to be free

Nobody tells you this when you're junior: writing the code badly, three times, before you get it right — that wasn't overhead you were paying to reach the real work. That *was* the real work. Every bug I chased at 2am taught me something about the system a senior engineer could have told me in one sentence, except it wouldn't have stuck the same way. I had to hit the wall myself.

I know what that friction is for, because I'm living a version of it right now with Go. I'm bad at it on purpose, in the sense that I chose to be a beginner again instead of staying comfortable in Python, and I've learned to read that discomfort as the sign that something real is getting built underneath it. Struggle isn't a tax on learning. It's the mechanism.

So here's the uncomfortable version of the question: if an agent does that early struggle for someone now, it isn't just saving them time. It might be removing the exact thing that used to turn a beginner into someone with judgment. I got fast at reviewing code partly because I spent years being slow at writing it badly first. I'm not sure that path is still open to the person starting today, because the part they'd be slow and bad at is the part the agent now does for them by default.

## Maybe this is just Python again

I want to give the other side its full weight, because I've lived through one abstraction jump already and it turned out fine. Nobody mourns hand-written assembly. Python didn't make programmers worse — it made a different kind of programmer possible, one who could build agent graphs and ML pipelines instead of managing memory by hand. Every abstraction layer in this field's history has looked like a loss of skill from one side and a gain in leverage from the other, and the leverage side has always won the argument eventually.

There's actual research pointing this way too. Some of the data on how people use coding agents shows that more experienced developers get meaningfully better outcomes from them than less experienced ones do — which suggests this isn't pure automation replacing skill, it's automation rewarding a *different* skill unevenly, the same way a compiler rewarded people who understood what they were compiling. If that's the whole story, "reviewing an agent's implementation" is just this decade's version of "writing in a high-level language instead of assembly," and in ten years missing manual implementation will sound as strange as missing manual memory management sounds now.

I want that to be true. I'm not sure it is, and the reason I'm not sure is specific: Python still made you understand what your code did. You could always drop down a level and see the machinery if you needed to. What I'm less convinced of is whether reviewing an agent's output builds the same understanding that writing it from scratch does. Direction and execution aren't the same muscle, even when direction turns out to be the harder job in the long run.

## Tests were green

I read something recently that's stuck with me more than any of the research: a junior got asked in review why they'd chosen a recursive approach over a loop, and what would happen with a deeply nested input. They didn't know. They hadn't chosen anything — the agent had, and it got accepted because the tests passed. The code was fine. The understanding wasn't there, and the gap was invisible until someone poked at it on purpose.

That's the whole debate in one moment, and it's why "the tests pass" has quietly become a weaker signal than it used to be. Tests tell you the code works. They've never told you whether the person shipping it understands why, and we used to get that understanding almost for free, as a side effect of the code being slower and harder to produce. Now that side effect doesn't happen automatically anymore. If we want it, someone has to build it back in on purpose.

There's a real research paper on exactly this pipeline problem — modeling how generative coding tools erode the path from junior to senior, precisely because the entry-level tasks that used to build a junior's judgment are the ones getting absorbed first. That's not a hot take from a blog. That's people trying to model the mechanism, and the mechanism is uncomfortably simple: you can't practice the reps that no longer exist.

## What I actually worry about

I can direct an agent reasonably well right now because I spent years being the one doing the implementation badly first. That judgment isn't a standalone skill I picked up separately — it's downstream of a few thousand hours of getting things wrong myself, slowly, until wrong started looking familiar enough to spot on sight.

I don't think the interesting risk is that I get worse at hand-writing code I no longer need to hand-write. Some manual skill will fade the way any skill fades when a machine takes it over, and that's a small loss, not a crisis. The real question is about the person five years behind me: how do they build the same judgment, when the exact work that used to build it is the work now getting done for them before they ever struggle with it?

## So

I don't think "will AI replace programmers" is the interesting question anymore. It's too binary for what's actually happening, and it lets everyone pick a side without doing the harder work of sitting with the discomfort in the middle.

The question I keep coming back to is quieter: when the work that used to teach the skill is the same work getting automated, where does the next generation's judgment come from? I don't have that answer. I know it isn't nostalgia for typing more code — the typing was never the point, same as it's never been the point in any language switch I've made. What's worth protecting is whatever mechanism turns a beginner into someone with judgment, the same one that turned me into whoever I am now without me noticing it was happening. I think we need to go find that mechanism on purpose, because up to now, it's mostly happened to us by accident.