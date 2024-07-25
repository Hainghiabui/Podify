const fetchRoomView = async () => {
  try {
    const response = await fetch(
      'https://sh-dev.qcloud.asia/booking/api/hk/get-room-view',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie:
            'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8; session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
        },
        body: JSON.stringify({
          buildingCode: 'DIAMOND',
          floorCode: '',
          dateRoom: '',
          roomCode: '',
          roomTypeCode: '',
          blockStatus: '',
          hkStatus: '',
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const floorNumber = data.floor.match(/\d+/)[0];
    const roomId = data.id;
    const roomCode = data.roomCode;
    const roomTypeCode = data.roomTypeCode;
    const blockStatus = data.blockStatus;
    const hkStatus = data.hkStatus;
    const isBlocked = data.isBlocked;
    const roomStatus = data.roomStatus;
    const noOfGuest = data.noofGuest;
    const isBackToBack = data.isBackToBack;
    const guestStatus = data.guestStatus;
    const roomTypeName = data.roomTypeName;

    console.log({
      floorNumber,
      roomId,
      roomCode,
      roomTypeCode,
      blockStatus,
      hkStatus,
      isBlocked,
      roomStatus,
      noOfGuest,
      isBackToBack,
      guestStatus,
      roomTypeName,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchRoomView();
