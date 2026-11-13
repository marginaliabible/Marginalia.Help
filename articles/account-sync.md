# Account Sync
[Account Sync](target:account-sync-button) is a fundamental feature of Marginalia that allows you to sync practically any digital file containing scripture references in your cloud provider such as Microsoft OneDrive or Google Drive to your Bible. They could be your own study notes, syllabus pages, digital books you've purchased, crazy Bible memes, or any other resource as long as it averages at least one scripture reference per page. Your resources are indexed by scripture reference then made available for each verse in your Bible alongside resources provided by your ministry.

## Connecting your account
Presently, Marginalia supports syncing with Google Drive and Microsoft OneDrive Personal accounts.

[Show me how](tour:account-sync-connect)

To connect your account:

- Click the [Account Sync](target:account-sync-button) button in the upper-right corner of the app.
- Click the **Connect** button next to your provider of choice. 
- Check the **Sync my files** checkbox and click **Connect**.
- Follow the prompts to grant Marginalia access to your files.

## Selecting resources to sync
After you [connect your account](#connecting-your-account), in Account Sync you will be able to see your folders within the provider you connected.
- In the left panel, expand your provider and select folders which you would like to sync.
- In the right panel, apply one or more tags each folder.
- By default, all resources in the folder will be synced and share the same tags. You can alter the tags of specific files or subfolders, or exclude them from syncing using the <i class="fa-solid fa-arrows-rotate" aria-label="Stop syncing"></i> icon.

## Usage and plan limits
Marginalia offers a generous one gigabyte of usage for free. After that, you can upgrade to a paid plan to continue syncing your resources. Your existing resources will remain available, but new resources will not be indexed until you upgrade or deselect some of your existing resources.  

Each file or folder displays its total size next to it. For reference, 1,000 KB is approximately 1 MB, and 1,000 MB is approximately 1 GB. You can deselect files or folders by clicking the <i class="fa-solid fa-arrows-rotate" aria-label="Stop syncing"></i> icon next to them. Deselected items display a <i class="fa-solid fa-upload" aria-label="Resume syncing"></i> icon. Clicking the icon again will re-select it.

The progress bar at the bottom of the panel shows the total size required to index your selected. It updates automatically as you select or deselect items and has a key above it showing what each color on the bar represents along with the size of each segment. The green and yellow segments are the total size of your selected resources—Green for those within the limits of your currently selected plan, and yellow for those that exceed that limit.

Each file that gets indexed requires a certain amount of bandwidth and processing power to analyze it. That cost is not recouped entirely when a file is deselected. Similarly, if a file is modified, the entire file must be re-indexed to reflect the changes. To offset this cost, when a file is deselected that was already indexed, only half of its original size will be removed from your usage. And when a file is modified, the original file size is retained in your overall usage. This is referred to as **Committed Processing**, and its impact is shown as a blue segment in the progress bar.

A deselected file is kept for up to 10 days before it's deleted. Reselecting an unchanged file within that time will restore it to your usage and no longer counts as **Committed Processing**. Deselected files older than 10 days must be re-indexed so the original continues to count as **Committed Processing**.