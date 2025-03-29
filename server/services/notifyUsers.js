import cron from "node-cron";

export const notifyUsers = () =>{
    cron.schedule("*/30 * * * *", async () =>{
        try {
            const oneDayAgo = new DataTransfer(Date.noe() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate:{
                    $1t: oneDayAgo
                },
                returnDate: null,
                notified: false,
            });

            for(const element of borrowers){
                if(element.user && element.user.email){
                    const user = await UserActivation.findById(element.user.id);
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return Remiander",
                        message: `Hello ${element.user.name},\n\nThis is a remainder that the book you borrowed is due for return today. Please return the book to the library as soon as possible.\n\nThank you.`,
                    });
                    element.notified = true;
                    await element.save();
                    console.log(`Email sent to ${element.user.email}`)
                }
            }
        } catch (error) {
            console.error("Some error occured while notifying users.", error);
        }
    });
};