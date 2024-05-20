import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { types, colors } from '../../constants';
import MultiSwitch from 'react-native-multiple-switch';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import CustomChipGroup from '../../components/CustomChipGroup';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton';

const BookNow = () => {
  const [selectedChip, setSelectedChip] = useState(types.booking_type_room);
  const chips = [
    types.booking_type_room,
    types.booking_type_food,
    types.booking_type_travel
  ];

  const items = ['Select Dates', 'One Day Visit'];
  const [value, setValue] = useState(items[0]);

  return (
    <SafeAreaView className="h-full bg-white" edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full px-4 my-6">
            <Text className="text-2xl font-psemibold">{`${selectedChip} Booking`}</Text>

            <CustomChipGroup
              chips={chips}
              selectedChip={selectedChip}
              handleChipPress={(chip) => setSelectedChip(chip)}
            />

            {selectedChip === types.booking_type_room && (
              <RoomBooking
                items={items}
                value={value}
                onSwitchChange={(val) => setValue(val)}
              />
            )}
            {selectedChip === types.booking_type_food && <FormComponent2 />}
            {selectedChip === types.booking_type_travel && <FormComponent3 />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const RoomBooking = ({ items, value, onSwitchChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selected, setSelected] = useState('');
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const { width } = useWindowDimensions();
  const today = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');

  const roomTypeList = [
    { key: 'AC', value: 'AC' },
    { key: 'Non AC', value: 'Non AC' }
  ];
  const [roomType, setRoomType] = useState();

  const floorTypeList = [
    { key: 'Yes', value: 'Yes' },
    { key: 'No', value: 'No' }
  ];
  const [floorType, setFloorType] = useState();

  return (
    <View className="flex-1 justify-center items-center mt-10">
      <MultiSwitch
        items={items}
        value={value}
        onChange={(val) => onSwitchChange(val)}
        containerStyle={{
          backgroundColor: colors.gray_200,
          height: 40,
          borderRadius: 15,
          borderWidth: 2,
          padding: 0,
          borderColor: colors.gray_200
        }}
        sliderStyle={{
          backgroundColor: 'white',
          borderRadius: 20
        }}
        textStyle={{
          color: 'black',
          fontSize: 12,
          fontFamily: 'Poppins-Medium'
        }}
      />

      {value === items[0] && (
        <View>
          <Calendar
            className="mt-5"
            style={{
              width: width * 0.9
            }}
            minDate={today}
            onDayPress={(day) => {
              if (startDay && !endDay) {
                const date = {};
                for (
                  const d = moment(startDay);
                  d.isSameOrBefore(day.dateString);
                  d.add(1, 'days')
                ) {
                  date[d.format('YYYY-MM-DD')] = {
                    color: colors.orange,
                    textColor: 'white'
                  };

                  if (d.format('YYYY-MM-DD') === startDay)
                    date[d.format('YYYY-MM-DD')].startingDay = true;
                  if (d.format('YYYY-MM-DD') === day.dateString)
                    date[d.format('YYYY-MM-DD')].endingDay = true;
                }

                setMarkedDates(date);
                setEndDay(day.dateString);
              } else {
                setStartDay(day.dateString);
                setEndDay(null);
                setMarkedDates({
                  [day.dateString]: {
                    color: colors.orange,
                    textColor: 'white',
                    startingDay: true,
                    endingDay: true
                  }
                });
              }
            }}
            markedDates={markedDates}
            markingType="period"
            theme={{
              arrowColor: colors.orange,
              todayTextColor: colors.orange
            }}
          />

          <CustomDropdown
            otherStyles="mt-7"
            text={'Room Type'}
            placeholder={'Select Room Type'}
            data={roomTypeList}
            setSelected={(val) => setRoomType(val)}
          />

          <CustomDropdown
            otherStyles="mt-7"
            text={'Book Only if Ground Floor is Available'}
            placeholder={'Select Floor Type'}
            data={floorTypeList}
            setSelected={(val) => setFloorType(val)}
          />
          <CustomButton
            text="Book Now"
            handlePress={() => {}}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      )}

      {value === items[1] && (
        <View>
          <Calendar
            className="mt-5"
            style={{
              width: width * 0.9
            }}
            minDate={today}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                textColor: 'white',
                selected: true,
                disableTouchEvent: true,
                selectedColor: colors.orange
              }
            }}
            theme={{
              arrowColor: colors.orange,
              todayTextColor: colors.orange
            }}
          />

          <CustomButton
            text="Book Now"
            handlePress={() => {}}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
        </View>
      )}
    </View>
  );
};

const FormComponent2 = () => {
  // Form component for Chip 2
  return (
    <View className="flex-1 justify-center items-center mt-5">
      <Text>Form for Chip 2</Text>
    </View>
  );
};

const FormComponent3 = () => {
  // Form component for Chip 3
  return (
    <View className="flex-1 justify-center items-center mt-5">
      <Text>Form for Chip 3</Text>
    </View>
  );
};

export default BookNow;
