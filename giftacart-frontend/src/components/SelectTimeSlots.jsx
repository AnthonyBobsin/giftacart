import React, { useState, useEffect, Fragment } from "react";
import { Accordion, AccordionSummary, AccordionDetails, CardContent, Grid, List, ListItem } from "@material-ui/core";
import { Button, useDataProvider } from "react-admin";
import ExpandMore from '@material-ui/icons/ExpandMore';

const SelectTimeSlots = props => {
  const { selectedTimeSlots, setSelectedTimeSlots } = props;

  const dataProvider = useDataProvider();
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    dataProvider
      .getMany("time_slots", { ids: ["slot-909"] })
      .then(({ data }) => {
        setTimeslots(data);
      })
      .catch(error => console.error(error));
  }, [])

  const timeslotsByDate = timeslots.reduce((memo, current) => {
    if (!(current.date in memo)) {
      memo[current.date] = [];
    }
    memo[current.date].push(current);

    return memo;
  }, {})

  const selectedTimeSlotIds = selectedTimeSlots.map(ts => ts.id);

  // TODO(bobsin): group this selection by store
  return (
    <CardContent>
      {Object.keys(timeslotsByDate).map((date, idx) => (
        <Accordion expanded key={idx}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {date}
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              {timeslotsByDate[date].map((timeSlot, idx2) => (
                <Grid justifyContent="space-between" container key={idx2}>
                  <Grid item style={{ margin: "auto 0" }}>
                    {`${timeSlot.from_time} - ${timeSlot.to_time}`}
                  </Grid>
                  <Grid item>
                    {
                      selectedTimeSlotIds.includes(timeSlot.id)
                        ? <Button disabled label="Selected" />
                        : <Button label="Choose" onClick={() => setSelectedTimeSlots([timeSlot])}/>
                    }
                  </Grid>
                </Grid>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </CardContent>
  )
};

export default SelectTimeSlots;
