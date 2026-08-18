---
title: "Godot, Not Unity, This Time"
date: "2026-08-18"
excerpt: "I put the game on the list once already, priced out by everything code couldn't fix. Coming back, the first decision wasn't art or level design. It was the engine, and I picked the one that isn't Unity."
tags: ["story", "engineering", "gamedev"]
---

Last time, the code was never the problem. The character with no soul was. I wrote about that already: I hit character design, then level design, then the whole stack of disciplines behind them, and none of it moved for the one method that's never failed me, taking a system apart until it gives up its seams. Art doesn't have seams. I set the project down and put it on the list.

I'm off the list now, and this time I made myself answer a question I skipped the first round: which engine, and why. Not "Unity, because that's the one everyone starts with." An actual comparison, run against what I'm actually doing, not against what a professional studio is doing.

So here it is, the real version, not the version that just says Godot wins.

## Where Unity actually wins, no hedging

Unity's asset store is not a minor edge, it's a different category of thing. Inventory systems, dialogue systems, procedural generation, shaders, character controllers, all buyable. If you're solo and time-constrained, that's three weeks you don't spend rebuilding an inventory grid. Godot's asset library is growing, but it isn't close.

Tutorials and courses: Unity, by volume, buries Godot. If you get stuck at 1am, the Unity answer to your exact stuck-ness probably already has three YouTube videos.

Consoles: Unity has an established pipeline to PlayStation, Xbox, Switch. Godot doesn't ship official export templates for any of them, you need to be an approved developer and go through a licensed porting partner. If a hobby project ever actually takes off and console starts to matter, Unity's path is shorter.

Big, complex 3D: Unity's more mature here, and if I were building something ambitious in 3D, that would matter more than anything above it.

And the one that matters most if I'm honest: if the real goal ever becomes getting hired as a game developer, not making a game as a hobbyist, Unity is the safer bet. The job market runs on it far more than it runs on Godot. That's not a small asterisk, it's the actual tradeoff.

None of that is Godot marketing. It's where Unity is just better, full stop.

## Where my project actually sits

Now the part that changes the answer for me specifically.

I'm not building large 3D. I'm not chasing a Unity job. I'm one person, on Fedora, coming back to this as a hobby I might someday take further, and the thing I'm making is 2D. On the axis I actually live on, the table flips:

| Area | Godot | Unity |
|---|---|---|
| 2D | Excellent | Excellent, but built on top of a 3D-first engine |
| Editor speed / iteration loop | Change, then play | Change, compile, wait, play |
| Linux as a first-class OS | Yes | Supported, but not the center of gravity |
| Licensing | Open source, no strings | More layers to track |
| Getting back into gamedev after years away | Low friction | More friction |

The iteration loop is the one I felt fastest. Two hours in Unity used to mean change, compile, wait, play, stop, change again. In Godot that gap mostly closes to change, then play. For a hobbyist squeezing development into spare hours, that's not a nice-to-have, it's the difference between finishing a session with something working or with a coffee gone cold during a compile.

Linux mattered more than I expected going in. I'm not dual-booting or fighting an editor that treats Fedora as an afterthought. Godot is built as cross-platform open source from the ground up, and it shows in ways Unity's Linux support, real but secondary, doesn't quite match.

And GDScript, on top of it: gradually typed, built specifically around Godot's node architecture, and close enough to Python that I'm not paying the full beginner's tax I paid learning C# the first time around. I've already written about how Python is the language that stopped making me leave to get the next thing done. GDScript feels like a smaller cousin of that same idea.

## The part I'm not pretending

I'm not going to write the sentence "Godot wins" and mean it generally, because it isn't generally true. It wins for a solo 2D hobbyist on Linux who isn't optimizing for a Unity resume line or a console launch. Move any one of those variables and the table can flip back.

That's the actual answer, not the tidy one. Unity is the better engine for a specific set of goals I don't currently have. Godot is the better engine for the specific goals I do have. Picking a side isn't the same as picking the objectively stronger tool, it's matching the tool to the shape of the problem in front of me, which is the only method I've ever trusted anyway.

## What I actually set up

Concrete version, not just the pitch.

Godot 4.7.1, GDScript, project split the way the engine wants it split: every reusable thing is a scene, a `.tscn` file, which is a tree of nodes with one script attached at most at the root. A player isn't a prefab with a bag of components bolted on, it's a scene: `CharacterBody2D` at the root, a `Sprite2D` and `CollisionShape2D` as children, a script on the root node driving movement. Instance that scene wherever you need a player. That's the whole equivalent of Unity's prefab-plus-MonoBehaviour pattern, just inverted: the tree is the object, not a component list attached to one.

Movement script, typed, looks like this:

```gdscript
extends CharacterBody2D

@export var speed: float = 220.0
@export var gravity: float = 900.0

func _physics_process(delta: float) -> void:
    velocity.y += gravity * delta
    var direction := Input.get_axis("move_left", "move_right")
    velocity.x = direction * speed
    move_and_slide()
```

The `@export` line is the part that felt most like Python: type hints that are optional, not fought with, and `@export` just exposes the variable to the editor's inspector, no attribute boilerplate. `_physics_process` runs on the fixed physics tick, `_process` runs per frame, same split Unity has with `FixedUpdate` and `Update`, different names.

Two other pieces mattered more than I expected going in. Signals replace the event-listener wiring I used to hand-roll in C#: a node emits `signal health_depleted`, anything that cares connects to it, no manual subscribe/unsubscribe management, no memory-leak-by-forgotten-listener. And autoloads are Godot's answer to a global singleton, a script that's alive for the whole game, which is where I put the one save-state manager instead of inventing a DontDestroyOnLoad pattern by hand.

None of that is exotic. It's the same shape of decisions any engine forces on you, movement, state, wiring. What changed is how many of them Godot answers by default instead of leaving as an exercise.

## Under the hood, where each one actually wins

The workflow comparison is the one people write. The engine-internals one is the one that actually decides whether the tool holds up once the game stops being a prototype, so here's that version too, split honestly.

| Area | Winner | Why |
|---|---|---|
| Raw scripting performance | Unity | C# compiles ahead-of-time via IL2CPP, and Burst plus DOTS/ECS gets you close to native for heavy simulation. GDScript is interpreted against a bytecode VM, fine for game logic, not built for tight per-frame math on thousands of entities |
| Rendering pipeline maturity | Unity | URP and HDRP, plus Shader Graph as a node-based editor, give you more post-processing and lighting control out of the box than Godot's Forward+ renderer currently matches |
| Animation and cinematic tooling | Unity | Timeline plus Cinemachine is a deeper cutscene and camera-work stack than Godot's AnimationPlayer, which covers the basics well but not orchestration at that scale |
| Multiplayer ecosystem | Unity | Netcode for GameObjects, Photon, Relay, matchmaking, all mature. Godot's high-level multiplayer API works, but you're building more of the infrastructure yourself |
| Profiling and debugging | Unity | The Unity Profiler and Frame Debugger break down CPU and GPU cost in more depth than Godot's built-in profiler currently offers |
| Startup weight and export size | Godot | The editor itself is roughly 80MB, no install, and exported 2D games land in single-digit megabytes. Unity's runtime and build pipeline carry more overhead by default |
| Native extensibility | Godot | GDExtension lets you write C++ or Rust that binds into the engine without recompiling Godot itself. Unity's native plugin path exists but is heavier to set up |
| 2D-specific tooling | Godot | TileMap, TileSet, and pixel-perfect rendering are first-class citizens because the engine wasn't built 3D-first and then had 2D bolted on |
| Engine transparency | Godot | It's open source. When something breaks and the docs don't explain why, I can read the engine source itself, or patch it, instead of waiting on a vendor |
| 3D physics accuracy | Roughly tied | Godot 4's line moved to Jolt Physics for 3D, which closed most of the gap that used to exist against Unity's PhysX. For 2D physics, which is what I'm actually using, both are solid |

The performance row is the one worth being precise about, because it's the one most likely to get overstated in either direction. GDScript being interpreted doesn't mean it's slow for a 2D hobby game, moving a character, checking collisions, running a state machine is nowhere near the ceiling where the interpreter cost shows up. It matters when you're pushing thousands of active entities, complex procedural generation, or physics-heavy simulation at scale. Godot's answer, when you actually hit that wall, is to write the hot path in C# through Godot's Mono build, or in GDExtension via C++ or Rust, and keep GDScript for everything that isn't the bottleneck. I haven't needed that yet. I'm noting it because pretending the ceiling doesn't exist would be the same dishonesty as pretending Unity's asset store doesn't exist.

## So

The wall last time wasn't the engine, it was everything past the code, and that hasn't changed just because I switched tools. Godot doesn't draw the character for me. It doesn't design the level. What it changes is smaller and more honest than that: the loop between changing something and seeing it happen is shorter, the platform I already live on is treated as first-class instead of tolerated, and the language handed to me doesn't feel like a second beginner's tax stacked on top of the first one.

That's not a verdict on Unity. It's a verdict on where I am right now, one person, spare hours, 2D, Fedora, trying again. If the project ever grows past that shape, into something 3D-heavy or console-bound or actually chasing a studio job, I'll run this same comparison again and it might come out the other way. For now, Godot's the one that gets out of my way, and getting out of my way is the whole ask.
