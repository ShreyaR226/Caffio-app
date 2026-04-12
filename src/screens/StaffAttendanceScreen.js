import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Calendar } from "react-native-calendars";
import API from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StaffAttendanceScreen() {
  const [attendance, setAttendance] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const fetchAttendance = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await API.get("/attendance/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const currentMonthAttendance = res.data.filter((item) => {
        const recordDate = new Date(item.date);

        return (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        );
      });

      setAttendance(currentMonthAttendance);

      const marks = {};

      res.data.forEach((item) => {
        marks[item.date] = {
          selected: true,
          selectedColor:
            item.status === "Present" ? "green" : "orange"
        };
      });

      setMarkedDates(marks);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const checkIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await API.post(
        "/attendance/checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCheckedIn(true);
      setCheckedOut(false);

      fetchAttendance();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const checkOut = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await API.post(
        "/attendance/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCheckedOut(true);

      fetchAttendance();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5EFE6" }}>

      <ImageBackground
        source={require("../../assets/image.png")}
        style={{
          paddingVertical: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          overflow: "hidden",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold"
          }}
        >
          Attendance
        </Text>
      </ImageBackground>

      <View style={{ padding: 15 }}>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 15,
            marginBottom: 20,
            elevation: 4
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Current Month</Text>

          <Text
            style={{
              fontSize: 22,
              color: "#6F4E37"
            }}
          >
            {attendance.length} Days Present
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 10,
            elevation: 4
          }}
        >
          <Calendar
            markedDates={markedDates}
            theme={{
              todayTextColor: "#6F4E37",
              selectedDayBackgroundColor: "#6F4E37",
              arrowColor: "#6F4E37"
            }}
          />
        </View>

        <View style={{ marginTop: 25 }}>

          <TouchableOpacity
            onPress={checkIn}
            style={{
              backgroundColor: checkedIn ? "green" : "#C8A27A",
              padding: 15,
              borderRadius: 12,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 18
              }}
            >
              Check In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={checkOut}
            style={{
              backgroundColor: checkedOut ? "green" : "#6F4E37",
              padding: 15,
              borderRadius: 12
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 18
              }}
            >
              Check Out
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}
