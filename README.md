# ChanceMe
ChanceMe is a simpler, more accurate, more fun way to calculate your chances of getting into college.

## Inspiration

Brennan had noticed a lot of angst among both his friends and posters on the website collegeconfidential.com about college, and specifically admissions decisions. On collegeconfidential.com, there are several thousand "chances" threads where people post their admissions stats, their extra curricular activities, basically their entire life stories and ask strangers to rate their chances of getting into certain schools. Brennan looked at the existing college chances calculators and found that they were all both extremely complicated/clunky (often requiring signing up for services as part of a larger platform) and only based their calculations on objective stats provided by the user. It appeared to Brennan that there was an unmet demand for a simple and accurate assessment of a student's chances of getting into certain schools. The market appeared to deem Collegeconfidential.com forums as the best option, but it didn't seem too hard to provide a simpler and more accurate answer than random internet strangers, so we set out to build a more accurate college chances calculator that provides a simple numerical percentage chance of getting into a school based on both objective (computed from stats inputted by the user) and subjective portions (computed from a personality diagnosis test that isolates character traits that admissions officers look for in essays, rec letters, etc.) of the admissions process.

## What it does

ChanceMe calculates the chances that a student gets in to a specified college based on a combination of user-inputted objective data that is compared to admitted student profiles from the specific schools and a personality diagnosis test that seeks to isolate characteristic traits that admissions officers look for in the subjective portions of the college admissions process.

## How we built it

Brennan had built a very basic blocks code demo version college chances calculator built in mitappinventor for a school project prior to Spartahack. Using that as an inspiration, we brainstormed pseudocode for a more sophisticated web-app college chances calculator. Sumit worked primarily on writing the code for the calculator's functionality using JavaScript. He also used C# to create a data scraper that he used to parse the college admissions data that the app uses to compare a student to a given school's admitted student profile. Zhanne worked primarily on designing the user interface using HTML. Brennan and Alex worked primarily on computing the main algorithm's that the calculator uses. They also assisted with writing the JavaScript code.

## Challenges we ran into

We had some trouble initially finding the data we wanted to use, but eventually Sumit figured out how to create a data scraper that sped everything up. Tweaking the algorithm and finding the right coefficients to use also took a decent amount of time. Other than that, the actual JavaScript wasn't too complicated. Figuring out how to size the website properly for mobile in HTML was a bit tricky, but eventually we figured it out using Skeleton Framework.

## Accomplishments that we're proud of

Our goal was to create something that was both simpler, more accurate, and more fun to use than the current alternatives. We are proud to say that we think we have created a very simplistic user interface that is enjoyable to use. We also believe that we have created a calculator that gives an accurate assessment of a user's chances of getting into a certain school, although there is room for improvement on that front (specified below).

## What we learned

As first-time hackathon attendees, the main thing that we learned was how much we could accomplish by teaming up and committing to work on something for a set period of time. None of us had met prior to this weekend, so it was also a learning experience in team-building and working with new people. Code-wise, Brennan and Alex both had limited experience with programming and felt their skills improved immensely over the course of the weekend.

## What's next for ChanceMe

The main thing that we need to extend ChanceMe further is better data. Using linear statistical regression, we were able to calculate what percentage of an admissions decision from each individual school is based on objective stats (i.e. GPA, test scores). Using that coefficient, we created a method to weigh the importance of the objective and subjective sections of an application for each specific school. In order to implement that method, however, it would be necessary to have a larger, more representative sample size than the one we have currently. Currently, the tool provides equal weight to the subjective and objective elements for each school, but using the coefficient as a weighting mechanism could provide even greater accuracy. In order to test our basic assumptions about ChanceMe's viability, we have created a feedback form and plan to have several hundred people use the tool and provide feedback in the next few weeks. From there, we will discuss the results of the consumer testing and make a determination about how to proceed.