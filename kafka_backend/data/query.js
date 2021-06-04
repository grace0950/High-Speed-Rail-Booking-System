let i;
for (i = 0; i < data.length; i++) {
  let _start = data[i].DailyTrainInfo.StartingStationName.Zh_tw;
  let _destination = data[i].DailyTrainInfo.EndingStationName.Zh_tw;
  let _train_no = data[i].DailyTrainInfo.TrainNo;
  let _hour = data[i].StopTimes[0].ArrivalTime.substr(0, 2);
  let _minute = data[i].StopTimes[0].ArrivalTime.substr(3);
  console.log(
    "insert into train (year, month, day, start, destination, train_no, hour, minute) values(2021, 06, 27, '" +
      _start +
      "', '" +
      _destination +
      "', " +
      _train_no +
      ", " +
      _hour +
      ", " +
      _minute +
      ");"
  );
}
