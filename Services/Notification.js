const { Expo } = require('expo-server-sdk');

let expo = new Expo();

module.exports = {
    sendSingleNotification : ({to, message, title, data, iOS=true}) => {
        let messages = [];

        if (!Expo.isExpoPushToken(to)) {
            return {
                message: `Push token ${to} is not a valid Expo push token`,
                status: "error",
                statusCode: 406
            }
        }

        messages.push({
            to: to,
            title: title,
            _displayInForeground: iOS,
            sound: 'default',
            body: message,
            data: { withSome: 'data' },
        });

        let chunks = expo.chunkPushNotifications(messages);
        
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                return { ...ticketChunk[0], statusCode: 202}
               // tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
        
        // let receiptIds = [];
        // for (let ticket of tickets) {
        //     // NOTE: Not all tickets have IDs; for example, tickets for notifications
        //     // that could not be enqueued will have error information and no receipt ID.
        //     if (ticket.id) {
        //         receiptIds.push(ticket.id);
        //     }
        // }
            
        // let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

        // // Like sending notifications, there are different strategies you could use
        // // to retrieve batches of receipts from the Expo service.
        // for (let chunk of receiptIdChunks) {
        //     try {
        //         let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        //         console.log(receipts);

        //     // The receipts specify whether Apple or Google successfully received the
        //     // notification and information about an error, if one occurred.
        //     for (let receiptId in receipts) {
        //         let { status, message, details } = receipts[receiptId];
                
        //         if (status === 'ok') {
        //         continue;
        //         } else if (status === 'error') {
               
        //         console.error(
        //             `There was an error sending a notification: ${message}`
        //         );
                    
        //         if (details && details.error) {
        //             console.error(`The error code is ${details.error}`);
        //         }
        //         }
        //     }
        //     } catch (error) {

        //         console.error(error);
                
        //     }
        // }
    }
}
