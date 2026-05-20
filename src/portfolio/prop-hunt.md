---
layout: project.njk
title: Prop Hunt
pageTitle: Prop Hunt
pageSlug: portfolio/prop-hunt/
---
## Prop Hunt

A game based on the format of Prop Hunt, which is a hide & seek type game with the core feature being able to disguise as objects (i.e props). 

### Demo

<video src="/assets/videos/prop-hunt.mp4" autoplay muted loop playsinline class="project-video"></video>
<p align="center"><em class="warning-text">Many features / eye candies were removed for this demo</em></p>


### Code Snippet

This is a small snipet of the large codebase to showcase the systems used to make the prop mechanic functional. The purpose of this code is to handle the transformation of player to prop. The code has been slightly modified to make it easier to read and understand.

```lua
local deb = true
TransformEvent.OnServerEvent:Connect(function(plr, Model)
	if deb == true then

		local CharHRP = Char.HumanoidRootPart

		local PropHRP = Model.HumanoidRootPart

		local Rotation = CharHRP.CFrame - CharHRP.CFrame.Position
		local Position = CFrame.new(CharHRP.Position.X, PropHRP.Size.Y * 0.5, CharHRP.Position.Z).Position

		local newChar = Model:Clone()
		newChar.Name = plr.Name
		newChar.HumanoidRootPart.CFrame = Rotation + Position

		newChar.ClickDetector:Destroy();

		for i,v in pairs(newChar:GetChildren()) do
			if v:IsA('BasePart') then
				v.Anchored = false
				if v.Name ~= 'HumanoidRootPart' then
					v.CanCollide = false
				end
			end
		end

		local newHum = Instance.new('Humanoid')
		newHum.Parent = newChar

		plr.Character = newChar
		newChar.Parent = workspace

		Char:Destroy();

		spawn(function()
			deb = false
			wait(2)
			deb = true
		end)


	end
end)
```

