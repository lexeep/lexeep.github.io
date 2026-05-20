---
layout: project.njk
title: Game UI
pageTitle: Game UI
pageSlug: portfolio/game-ui/
---
## Game User Interface

A full UI system handling all aspects of [my other project.](blalba) Built with the goal of creating a responsive layout, with polished interactions, and cohesive player experience.

### Video

<video src="/assets/videos/game-ui.mp4" autoplay muted loop playsinline class="project-video"></video>


### Code Snippet

This is a small snipet of the large codebase to showcase the systems used to make the interface functional. The purpose of this code is to handle the equipping or buying of items. The code has been slightly modified to make it easier to read and understand.

```lua
local storeDeb = false
for i, bombButton in pairs(Bombs:GetDescendants()) do
	if bombButton:IsA("ImageButton") then
		local Config = bombButton.Config

		bombButton.InputBegan:Connect(function(input)
			if Busy then
				return
			end

		bombButton.Activated:Connect(function()
			Sounds.Click:Play()

			if storeDeb == true then
				Sounds.Error:Play()
				return
			end
			storeDeb = true

			if Config.State.Value == "UNLOCK" then
				if Config.Type.Value == "common" then
					if Coins.Value >= Price.Value then
						PromptPurchase({
                          Type = "item",
                          name = bombButton.Name,
                          price = Price.Value})
					else
						Sounds.Error:Play()
						storePages.UIPageLayout:JumpTo(storePages.Upgrades)
					end
				else
					if Config.Available.Value == true then
						storePages.UIPageLayout:JumpTo(storePages.Passes)
					end
				end
			end

			if Config.State.Value == "EQUIP" then
				local LastEquipped = Bombs.Special:FindFirstChild(Equipped.Value)
					or Bombs.Common:FindFirstChild(Equipped.Value)

				InteractStore:FireServer(bombButton.Name, "EQUIP")

				repeat
					wait()
				until Player.plrConfig.Bombs.Equipped.Value == bombButton.Name
				UpdateBomb(LastEquipped)
			end

			UpdateBomb(bombButton)

			task.spawn(function()
				wait(1)
				storeDeb = false
			end)
		end)
	end
end
```

