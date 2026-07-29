---
title: "AI Doesn't Replace Engineering. It Raises the Price of Bad Engineering."
date: "2026-07-30"
excerpt: "The tools got better. The judgment gap they expose got worse. A look at why AI makes good engineers faster and bad engineering more expensive, not the other way around."
tags: ["engineering", "ai"]
---

In 2016, at a medical conference, Geoffrey Hinton told a room full of people to stop training radiologists. His reasoning was simple and, at the time, hard to argue with: deep learning was already reading scans better than humans in narrow trials, the curve was only going up, and within five years, maybe ten, a radiologist's core task would belong to a model. It was not a fringe opinion. It came from one of the people who built the field.

Ten years later, radiology is short-staffed. Demand for radiologists is growing faster than the pipeline can fill it, and salaries have climbed, not collapsed. The AI got built. It reads scans, flags anomalies, triages the obvious cases. And it turns out reading a scan was never the whole job. The job was correlating that scan with a patient history, catching the case that doesn't look like the textbook, explaining a result to a frightened person, and being the one who's accountable when the read is wrong. Hinton was right about the tool. He was wrong about the work.

I think about that story every time someone tells me AI is coming for engineering next.

## The part that gets automated was never the whole job

The mistake in the radiology prediction wasn't technical. The model really did get good at pattern-matching pixels to diagnoses. The mistake was treating the visible, describable part of a profession as if it were the entire profession. Writing code has the same shape. A language model can produce a function, a component, a migration script, fast, and often correctly, for the same reason a model can read a scan: the pattern is legible, the training data is enormous, and the task has a checkable shape.

None of that is the job of an engineer. The job is deciding which function should exist at all. It's knowing that the fast solution to this ticket creates a locking problem for a different team in eight months. It's reading a vague request and asking the one question that changes the entire design. AI tools are extraordinary at the part of engineering that looks like typing. They have no opinion on the part that looks like judgment, because judgment isn't a pattern in a training set, it's the accumulated cost of every system you've watched break.

## What the numbers actually say

It's tempting to read the job-loss headlines as confirmation that this time is different. The World Economic Forum's [Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) doesn't support the simple version of that story. It projects 92 million jobs displaced by 2030, and 170 million created, a net gain of 78 million. Ninety percent of employers expect rising demand for AI and big-data skills. And in the same breath, 41% of employers expect to shrink roles exposed to AI-driven obsolescence while 70% plan to actively hire people with AI-related skills.

Read those two numbers together and the shape isn't replacement, it's a sorting. The report also says nearly 40% of required job skills are expected to change by 2030, and 63% of employers name the resulting skills gap as their biggest obstacle, ahead of cost or regulation. The bottleneck the WEF is describing isn't a lack of AI capability. It's a lack of people who know how to direct it. That's not a labor market shrinking. That's a labor market re-pricing judgment upward because the commodity part of the work just got cheap.

## Why the gap gets more expensive, not smaller

Here's the part that should worry anyone treating an AI tool as a shortcut instead of a lever: a tool that produces plausible output at zero friction doesn't remove the need for judgment, it removes the friction that used to force judgment to show up.

Before, writing a bad database query, a bad auth flow, a bad retry policy took effort. The effort was a natural checkpoint, a place where a person with experience usually got involved, if only because typing it all out by hand gave them time to notice it was wrong. AI collapses that friction. It will write the confidently wrong migration exactly as fast as the correct one, with the same clean formatting and the same reasonable-sounding comment above it. The check that used to happen by accident, because writing bad code was slow, now has to happen on purpose, because writing bad code is instant.

That is the actual mechanism behind "raises the price of bad engineering." It isn't a moral claim about laziness. It's a statement about where risk concentrates. When the cost of producing code drops to nearly nothing, the cost of a system built on code nobody understood stays exactly where it was, and now it compounds faster, because more of it gets shipped per week. The engineer who reviews, questions, and understands what the model handed them is worth more in this world, not less, because they're the only checkpoint left standing.

## What doesn't change

The instinct AI can't hand you is the same one games and Linux and four languages taught me long before any of this existed: take the thing apart until you know why it works. A model can generate the pieces. It cannot tell you which pieces belong together, or what breaks three steps away when you change one of them, because it doesn't hold the whole system in its head the way an engineer has to. It has no stake in the three-in-the-morning page. It just has the next plausible token.

## So

AI didn't shrink engineering down to typing. It just made the typing free, which means the only thing left to pay for is the part that was always the actual job, the part a radiologist and an engineer share more than either profession likes to admit: knowing when the obvious answer is wrong, and being willing to be the one who catches it.

The tools aren't the threat to bad engineering. They're the thing that finally makes it visible.
