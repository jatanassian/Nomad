import React from "react";
import ActivityItem from "./ActivityItem";

export default function ActivityList(props) {
  const { activities } = props;
  if (!activities) {
    return null
  } 

  let activityList = activities.map(act =>
    <ActivityItem 
      key={act.id}
      name={act.name}
      description={act.description}
      image={act.activity_image}
      link_names={act.link_names}
      link_types={act.link_types}
      link_urls={act.link_urls}
    />
  );
  return (
    activityList.slice(0, activityList.length - 2)
  )
};