## initial thoughts:

I immediately notice that the contrast is exceedingly poor (1.6:1 in the bottom messages panel, and WCAG AA needs at least 4.5:1). Planning to update this as a quick a11y win, though needs more thorough a11y testing (possibly with cypress) if I have time.

I'm curious as to why the connect string uses "ws" instead of "wss", but this isn't
really in scope for the exercise, so not going to delve too deeply into it.


# Approach to complete exercise Task B:

- I'm expecting that the best way to do this would be to fire an action to
unsubscribe from the topic that has 15000 messages and show a message to the
user that they've been unsubscribed, with the option to resubscribe.

- The unsubscribe is simple enough, though I'm not entirely happy with my approach
to stopping the messages incrementing in the UI...feels like a bit of a hack,
but might be unavoidable given the amount of data flowing through per second.

- It would be helpful to have a better view on the business reason for automatically
unsubscribing after a certain number. Presumably, if the real-time data is being
viewed, seeing a subset is enough to establish a general pattern, or to identify
something that's either obviously a problem or to clarify that something has been
fixed.

...I'm also assuming that combined with the ability to search for a given set of messages, the auto-unsubcribe will be a lot more valuable.

*Testing*

- I was getting some weird errors when attempting to use react version 16.8.3, and
a quick fix seemed to be to update react, react-dom, and react-test-renderer to
16.9.0, so I went ahead and did that just to unblock myself.

- I also initially was hoping to run a more integrated UI test, that clicking the
'clear messages' button would actually clear the messages, but since the prop
that is being called as a function (`clearMessages()`) is only valid once the
component is actually connected, I'm going to assume it's fine without trying
to mock the entire connected component.

- added some testing around the reducers, and had initially planned to also test,
from a reducer viewpoint, that unsubscribing was working, but looks like this
is also handled in the custom lenses middleware, so going to assume that it's
already tested.

# Approach to complete exercise Task A:

- just to get an MVP out of the way, planning to add a simple search button with
bulma styling that allows to search for all messages with a particular currency:
EUR. I'm hoping to use the internal state of the MessageList component to keep
this filter updated based on the search input text.

- ...after a bit of thought, I decided that the search, as a feature, wasn't
really refined enough to start work on. There were too many questions like:
"does the user want to search for any particular value in any particular field?",
"does the user want a fuzzy search?", "should the search be more of a filter and
hide non-matching results as you type?"...

- so I then considered implementing more of a dynamic filter based on the keys and values that were coming through in the messages. However, this seemed to be a bit
more work than I really had time for, but in theory it would be generalisable and
scale for all different kinds of keys, with the potential filter values taken as
either a range of the available values, or some sort of buckets if the values
were continuous rather than discrete (ie, time stamps instead of categories). It
would also be nice to be able to specify ranges for continuous values in the filter,
and this was definitely beyond what I had time for.

# Approach to complete exercise Task D:

- As mentioned above, I added some testing around the functionality from Task B (the auto-unsubscribe), as well as the buttons involved. I also added a few tests around the core reducer functions involved in that process.

- I decided to implement a bit more thorough accessibility testing, and have
added both the headless and non-headless cypress tests into the npm scripts in the
`package.json`. There were 6 accessibility violations on the main page, and I
updated the following to fix them: increased contrast, added labels, added one
main landmark and added one primary heading. I'm not very satisfied with the way
that I tweaking the contrast, given that I had to manually override a lot of the
bulma styling, and I feel this would be more easily accomplished with something
like a styled component approach.

I kept these two additional test scripts out of the main test run, since I would
say accessibility issues aren't necessarily something that we would want to fail
in CI, but could potentially be run on a nightly build to make sure we're not
introducing anything.

## miscellaneous

- I figured since we are importing all of bulma, we might benefit from adding
something like the purgecss plugin to the production build, so I went ahead and
did that, and it looks like the production build CSS asset size went from 175K to
17K, which is a decrease of around 90%.

So even though I didn't really have the time to implement all the stuff I was
thinking about, I still had a lot of fun and tackled some manageable chunks of
work.
