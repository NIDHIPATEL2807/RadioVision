# RadioVision

It is a AI powered website which helps radiologists and healthcare professionals analyze medical images such as X-rays, MRIs and CT scans to detect anomalies and classify medical conditions.

In this website , the doctor will login using his credentials , then he will have two options add patient , patient history list , and analyze images.
So the doctor can view different patients history and past ai analysis and his own remarks about the different cases of patient if there. He can also add new patient if new time patient and such , also directly do ai image analysis , and then if he wants to lik that analysis to  a past patient or a new on e, or discard it (so that doctors can use the app without hesitation), hence this feature of analysis should not be protected , I want doctprs to firs test and then decide if they want to login, thus enhancing user experience.

## Tech Stack

I will be using Nextjs , flask for ml integration , clerk for auth , superbase for database, deploy optional , swagger for api doc, ml will be using one api made by my friend so dont think about this , payload for thsi api that is for analyse is sending medical image, we will get a labeled image and optional text diagnosis along with it , then doctor will put his own remark about it , and that is the patietn model i was talking about , and it will be stored.
