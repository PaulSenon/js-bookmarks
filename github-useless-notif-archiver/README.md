# Github useless notifs archiver

Because we get spammed by useless github notification on PR that are already merged/closed or still in draft, and notification filters cannot do anything about that because it sucks.

## Installation

juste create a new browser bookmark and copy/past the content of the `github-useless-notifs-archiver.min.js` file.

## How to use

Whenever you have the github notification page opened, you can run the bookmark and it should work

## How it works

A simple js snippet that crawl DOM when gituhub notification page is open, to collect all useless notifications ids (merged/draft/closed), and send the request to bulk archive them automatically.

## Caveat

Only works on visible notifications (because based on current DOM queries).

Also it might break if github changes their class names and archive endpoint.