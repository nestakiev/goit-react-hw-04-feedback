import React, { useReducer } from "react";

import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Section } from "./Sections/Sections";
import { Notification } from "./Notification/Notification";


function reducer(state, action) {
  switch (action.type) {
    case "good":
      return {...state, good: state.good + 1};
    case "neutral":
      return {...state, neutral: state.neutral + 1};
    case "bad":
      return {...state, bad: state.bad + 1};
      default:
        throw new Error();
  }
}

const initialValue = {
  good: 0,
  neutral: 0,
  bad: 0,
}

export const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialValue);

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, n) => {return acc + n}, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const {good} = state;
    return good !== 0 ? Number.parseInt( good /(countTotalFeedback()) * 100) : 0;
  };
  
  const onLeaveFeedback = (key) => dispatch({type: key});

    const {good, neutral, bad} = state;
    const options = Object.keys(state);
    const total = countTotalFeedback();
    const positivePercentage = countPositiveFeedbackPercentage();

    return (
      <div>
        <Section title="Please leave feedback">
      <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback}/>
        </Section>
        <Section title="Statistics">
        {total === 0 ? 
                <Notification message="There is no feedback" /> : 
                <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage}/>}
        </Section>
      </div>
    );
  };


