// This file holds all the questions for the review application.

const allReviewData = {
    generalOrders: {
        unitSample: [
            { question: "This is a sample question to test the UI. What is the primary color of the Denton PD logo?", answer: "Blue", options: ["Red", "Blue", "Green", "Black"], reference: "N/A" },
        ],
        unit1: [
    // Questions from General Orders PDF - Chapter 1 & HTM File, Verified and Updated
    { question: "The purpose of General Order 100 is to affirm the authority of DPD members to perform their functions based on:", answer: "Established legal authority", options: ["Established legal authority", "The Chief's discretion", "City ordinances only", "Federal laws only"], reference: "GO 100.1: Affirms that all authority is based on established legal sources." },
    { question: "What is the policy of the Denton Police Department regarding the authority granted to its members?", answer: "To limit its members to only exercise the authority granted to them by law", options: ["To exercise unlimited authority", "To limit its members to only exercise the authority granted to them by law", "To follow federal guidelines exclusively", "To prioritize officer discretion over legal statutes"], reference: "GO 100.2: Members shall only exercise authority granted by law." },
    { question: "Sworn DPD members are considered peace officers pursuant to which Texas Code?", answer: "Tex. Code of Crim. Pro. art. 2.12", options: ["Tex. Penal Code § 9.51", "Tex. Transportation Code § 543.001", "Tex. Code of Crim. Pro. art. 2.12", "Tex. Local Gov't Code § 143.013"], reference: "GO 100.3: Defines the legal basis for peace officer status under CCP 2.12." },
    { question: "An officer can make a warrantless arrest for an offense committed in their presence or view according to which article?", answer: "Tex. Code of Crim. Pro. art. 14.01", options: ["Tex. Code of Crim. Pro. art. 14.01", "Tex. Code of Crim. Pro. art. 14.02", "Tex. Code of Crim. Pro. art. 14.03", "Tex. Code of Crim. Pro. art. 14.04"], reference: "GO 100.3.1(b): Outlines authority for warrantless arrests for offenses seen." },
    { question: "A DPD officer can make a warrantless arrest for a traffic offense committed in a different county.", answer: "False", options: ["True", "False"], reference: "GO 100.3.2(a): Officers may not make a custodial arrest for a traffic offense outside their jurisdiction unless it violates other laws." },
    { question: "All DPD members must observe and comply with every person's clearly established rights under the United States and ________ Constitutions.", answer: "Texas", options: ["Texas", "Denton", "North American", "International"], reference: "GO 100.4: Mandates compliance with both U.S. and Texas constitutional rights." },
    { question: "What is the minimum years of experience as a law enforcement officer required for the Chief of Police at the time of appointment?", answer: "5 years", options: ["2 years", "5 years", "10 years", "No minimum requirement"], reference: "GO 101.3: Specifies qualifications for the Chief of Police, including 5 years of experience." },
    { question: "The Chief of Police must be licensed by TCOLE within the time frame prescribed by which code?", answer: "Tex. Educ. Code § 96.641", options: ["Tex. Local Gov't Code § 143.013", "Tex. Educ. Code § 96.641", "Tex. Occ. Code § 1701.358", "Tex. Const. art. XVI, § 1"], reference: "GO 101.3: Outlines the TCOLE licensing requirement for the Chief." },
    { question: "The Oath of Office affirms a commitment to constitutional rights and dedication to duties.", answer: "True", options: ["True", "False"], reference: "GO 102.2: Describes the purpose of the Oath of Office." },
    { question: "If a member is opposed, the words 'so help me God' in the Oath of Office may be omitted.", answer: "True", options: ["True", "False"], reference: "GO 102.3: Allows for the omission of 'so help me God' upon request." },
    { question: "The General Orders manual is a statement of the ________ policies, procedures, rules, and guidelines of the department.", answer: "current", options: ["historical", "current", "suggested", "temporary"], reference: "GO 103.1: Defines the General Orders as a statement of current policies." },
    { question: "The provisions contained in the General Orders are intended to create an employment contract.", answer: "False", options: ["True", "False"], reference: "GO 103.2.1: Explicitly states the General Orders do not constitute an employment contract." },
    { question: "Who has the ultimate authority for the content and adoption of the General Orders?", answer: "The Chief of Police", options: ["The City Manager", "The Mayor", "The Chief of Police", "The City Council"], reference: "GO 103.3: Designates the Chief of Police as having final authority over the manual." },
    { question: "In the General Orders, the term 'May' indicates a ________ action.", answer: "permissive, discretionary or conditional", options: ["mandatory", "prohibited", "permissive, discretionary or conditional", "recommended"], reference: "GO 103.4: Defines terminology; 'May' indicates a permissive, discretionary or conditional action." },
    { question: "The term 'Should' indicates a generally required or expected action, absent a ________ for failing to conform.", answer: "rational basis", options: ["direct order", "supervisor's approval", "rational basis", "written exception"], reference: "GO 103.4: Defines terminology; 'Should' indicates a generally required or expected action." },
    { question: "General Orders become effective how many days after publication?", answer: "30 days", options: ["Immediately", "7 days", "14 days", "30 days"], reference: "GO 103.5: Specifies the 30-day effective date for new orders." },
    { question: "Each member shall acknowledge review of new General Orders and Departmental Directives within ________ days of being published.", answer: "30", options: ["10", "15", "30", "45"], reference: "GO 103.5: Sets the 30-day timeline for members to acknowledge new directives." },
    { question: "How many separate Bureaus are in the Denton Police Department?", answer: "Six", options: ["Four", "Five", "Six", "Seven"], reference: "GO 200.3: Outlines the organizational structure, including the six bureaus." },
    { question: "Cash handling in excess of what amount requires immediate supervisor notification and special handling?", answer: "$1,000", options: ["$500", "$1,000", "$1,500", "$2,000"], reference: "GO 1104.4.1: Requires special handling for cash amounts over $1,000." },
    { question: "All employees are required to complete NIMS and ICS training within ________ months of their initial assignment.", answer: "18", options: ["6", "12", "18", "24"], reference: "GO 202.9: Sets the 18-month deadline for NIMS/ICS training." },
    { question: "Any member who is unable to attend training shall notify their supervisor no later than how many minutes prior to the start of training?", answer: "60 minutes", options: ["15 minutes", "30 minutes", "60 minutes", "120 minutes"], reference: "GO 203.6(b): Establishes the one-hour notification requirement for training absence." },
    { question: "Fit testing for a respiratory PPE should be repeated at least once every ____ months.", answer: "12", options: ["6", "12", "18", "24"], reference: "GO 1404.6.1: Mandates annual fit testing for respiratory protection." },
    { question: "DPD members assigned an email account will check their messages at least ________ time(s) per shift.", answer: "one", options: ["one", "two", "three", "every hour"], reference: "GO 204.4: Requires members to check their email at least once per shift." },
    { question: "If a sworn supervisor will be absent for ______ consecutive work days or longer, an acting supervisor may be designated.", answer: "5", options: ["3", "5", "7", "10"], reference: "GO 206.4: Outlines the process for appointing an acting supervisor." },
    { question: "Members unavailable for more than _________ days should configure an 'out of office' reply on their email.", answer: "two", options: ["one", "two", "three", "five"], reference: "GO 204.4: Specifies when an 'out of office' email reply should be used." },
    { question: "Public information should be made available within how many business days upon payment of applicable costs?", answer: "10", options: ["5", "10", "15", "20"], reference: "GO 1102.5: Sets the 10-day timeframe for providing public information." },
    { question: "A DPD member must provide proof of a lawful prescription within how many hours after a screening test indicates a controlled substance?", answer: "72", options: ["24", "48", "72", "96"], reference: "GO 1600.6.2: Sets the 72-hour timeline for providing proof of prescription." },
    { question: "Officers suspended up to 5 working days may forfeit what as an alternative to serving the suspension?", answer: "Accumulated vacation or sick time", options: ["Their next pay raise", "Off-duty employment privileges", "Accumulated vacation or sick time", "Their assigned vehicle"], reference: "GO 1502.4: Provides an alternative to serving a short suspension." },
    { question: "A work-related injury must be reported to a supervisor within ______ hours.", answer: "24", options: ["8", "12", "24", "48"], reference: "GO 1602.3.1: Sets the 24-hour reporting deadline for work-related injuries." },
    { question: "Members must notify their supervisor they cannot report to work at least ________ minutes before their shift.", answer: "60", options: ["30", "45", "60", "90"], reference: "GO 1507.3: Requires at least one-hour notice for being unable to report to work." },
    { question: "Typically, an employee should not work more than _______ hours in any two-day (48 hour) period without supervisor approval.", answer: "30", options: ["24", "30", "36", "40"], reference: "GO 1508.3: Limits consecutive work hours." },
    { question: "Sworn personnel attending court off-duty as prosecution witnesses shall be paid a minimum of ________ hours.", answer: "3", options: ["1", "2", "3", "4"], reference: "GO 1508.6.1: Specifies minimum court time pay." },
    { question: "If your shift ends at 0700 but you work until 0908, how many hours of overtime have you accrued?", answer: "2.25", options: ["2.0", "2.13", "2.25", "2.5"], reference: "General timekeeping principles: Overtime is calculated based on actual time worked past the scheduled end time." },
    { question: "Sworn personnel called back to duty while off-duty shall be paid a minimum of _________ hours.", answer: "2", options: ["1", "2", "3", "4"], reference: "GO 1508.5: Specifies minimum call-back pay." },
    { question: "A second sustained violation of the same general order within a ________-month period constitutes a 'second offense' for disciplinary purposes.", answer: "36", options: ["12", "18", "24", "36"], reference: "GO 1502.4(a): Defines the timeframe for a second offense." },
    { question: "Lactation breaks totaling _________ during any four-hour work period are generally considered reasonable.", answer: "30 minutes", options: ["15 minutes", "20 minutes", "30 minutes", "45 minutes"], reference: "GO 1513.3: Provides guidelines for lactation breaks." },
    { question: "Typically, an employee should not work more than _______ hours in any seven-day period.", answer: "76", options: ["60", "70", "76", "80"], reference: "GO 1508.3: Sets a general limit for weekly work hours." },
    { question: "The Chief of Police should respond to a grievance within _______ calendar days.", answer: "14", options: ["7", "10", "14", "21"], reference: "GO 1512.4: Sets the timeline for the Chief's response to grievances." },
    { question: "The Department has _______ days from the date of discovery to investigate and discipline for a non-criminal act.", answer: "180", options: ["90", "120", "180", "240"], reference: "GO 1501.3.1: Sets the statute of limitations for administrative investigations." },
    { question: "Children younger than ______ years of age must be in a child restraint system (unless taller than 4'9\").", answer: "8", options: ["5", "7", "8", "9"], reference: "GO 800.7.1: Specifies the age requirement for child restraint systems." },
    { question: "A member absent for more than _______ consecutive days may be required to provide a doctor's note.", answer: "3", options: ["2", "3", "4", "5"], reference: "GO 1507.3(b): Outlines when a doctor's note may be required." },
    { question: "The Department has _______ days from the date of a non-criminal act to discover it.", answer: "240", options: ["180", "240", "360", "365"], reference: "GO 1501.3.1: Sets the discovery period for non-criminal acts." },
    { question: "DPD members must report undergoing a police detention within ________ hours to a supervisor.", answer: "4", options: ["Immediately", "2", "4", "8"], reference: "GO 1300.5: Mandates reporting of detentions." },
    { question: "A 360 review is a blind performance tool that solicits feedback from:", answer: "Managers, coworkers, and peers", options: ["Supervisors only", "Subordinates only", "Managers, coworkers, and peers", "The public"], reference: "GO 1500.4.1: Defines the 360 review process." },
    { question: "Naloxone should be given to a person suffering from what?", answer: "An opiate overdose", options: ["An allergic reaction", "A heart attack", "An opiate overdose", "A diabetic emergency"], reference: "GO 310.2: Specifies the use of Naloxone for opiate overdoses." },
    { question: "What is the department's mission statement?", answer: "To make Denton a safe, sustainable, and livable city for everyone, by keeping victims safe and holding offenders accountable", options: ["To protect and serve the citizens of Denton", "To make Denton a safe, sustainable, and livable city for everyone, by keeping victims safe and holding offenders accountable", "To enforce all laws without fear or favor", "To be a leader in law enforcement innovation"], reference: "Mission Statement: The official mission of the DPD." },
    { question: "Which term indicates a mandatory action in the General Orders?", answer: "Shall/will", options: ["May", "Should", "Could", "Shall/will"], reference: "GO 103.4: Defines 'Shall/will' as mandatory." },
    { question: "A false spoken statement that damages a co-worker's reputation is known as:", answer: "slander", options: ["libel", "gossip", "slander", "harassment"], reference: "GO 1301.1.1: Defines 'slander' as spoken defamation." },
    { question: "Who has the authority to approve and issue Departmental Directives and Surveys?", answer: "The Chief of Police or authorized designee", options: ["Any supervisor", "The City Manager", "The Chief of Police or authorized designee", "The Training Sergeant"], reference: "GO 201.4.2 & GO 205.5: Grants authority to the Chief or designee." },
    { question: "Which bureau is NOT commanded by a Deputy Chief?", answer: "Administrative Services Bureau", options: ["Investigations Bureau", "Patrol Bureau", "Support Bureau", "Administrative Services Bureau"], reference: "GO 200.3.1: Describes the command of the Administrative Services Bureau." },
    { question: "Which of the following describes the department's vision statement?", answer: "The sanctity of human life is the foundation by which the Denton Police Department serves.", options: ["To protect and serve our community with honor and integrity.", "To be a leader in 21st-century policing.", "The sanctity of human life is the foundation by which the Denton Police Department serves.", "To enforce the law impartially and without prejudice."], reference: "Vision Statement: The guiding vision of the department." },
    { question: "A police officer has jurisdiction in:", answer: "All of Texas", options: ["The city limits only", "The county only", "The North Texas region", "All of Texas"], reference: "GO 100.3.2: Confirms statewide jurisdiction for peace officers." },
    { question: "The authority to enforce municipal ordinances is limited to:", answer: "The boundaries of the city that employs the officer", options: ["Any city in the state", "The county the city is in", "The boundaries of the city that employs the officer", "Any city that has a mutual aid agreement"], reference: "GO 100.3.2: Specifies the limits of municipal ordinance enforcement." },
    { question: "When may a Texas peace officer arrest a person without a warrant?", answer: "All of the above", options: ["For any offense committed in their presence", "When they have probable cause to believe a felony has been committed", "For a violation of a protective order", "All of the above"], reference: "GO 100.3.1: Lists various authorities for warrantless arrest." },
    { question: "The Law Enforcement Code of Ethics is considered:", answer: "A guideline for professional conduct", options: ["A binding legal document", "A list of criminal offenses", "A guideline for professional conduct", "A replacement for the General Orders"], reference: "Law Enforcement Code of Ethics: Describes its purpose as a guide." },
    { question: "If a supervisor gives an order that conflicts with a previous order, the officer should:", answer: "Respectfully point out the conflict to the supervisor", options: ["Obey the first order given", "Obey the second order without question", "Respectfully point out the conflict to the supervisor", "Refuse to obey either order"], reference: "GO 1300.4.1: Instructs officers on how to handle conflicting orders." },
    { question: "An officer who follows an order they know to be unlawful is:", answer: "Not relieved of responsibility for the action", options: ["Relieved of responsibility because they were following orders", "Only subject to minor discipline", "Not relieved of responsibility for the action", "Only responsible if a citizen is injured"], reference: "GO 1300.4: States that obedience to an unlawful order is not a defense." },
    { question: "The authority of the Chief of Police is established by:", answer: "City charter and ordinances", options: ["State law only", "Federal law only", "City charter and ordinances", "Departmental vote"], reference: "GO 101.2: Outlines the source of the Chief's authority." },
    { question: "What is the primary role of the Assistant Chief of Police?", answer: "To act for the Chief in their absence and command a bureau", options: ["To manage the department's budget", "To act for the Chief in their absence and command a bureau", "To handle all media relations", "To oversee the training division exclusively"], reference: "GO 200.5.1: Describes the Assistant Chief's role." },
    { question: "Can a member use their badge for personal financial gain?", answer: "No, it is strictly prohibited", options: ["Yes, if the gain is less than $100", "Yes, for obtaining discounts", "No, it is strictly prohibited", "Only with supervisor approval"], reference: "GO 1000.4.1(a): Prohibits using the badge for personal gain." },
    { question: "The term 'Shall' or 'Will' in the General Orders indicates what?", answer: "A mandatory action", options: ["A recommended action", "A permissive action", "A mandatory action", "A prohibited action"], reference: "GO 103.4: Defines 'Shall/Will' as mandatory." },
    { question: "An officer can use their patrol vehicle for personal business while on duty.", answer: "False", options: ["True", "False"], reference: "GO 1002.3(e): Prohibits use of department vehicles for personal business." },
    { question: "An officer has a duty to intervene if they witness another officer using unreasonable force.", answer: "True", options: ["True", "False"], reference: "GO 300.2.1: Establishes the duty to intervene." },
    { question: "Necklaces worn by on-duty members shall not be visible above the shirt collar.", answer: "True", options: ["True", "False"], reference: "GO 1400.4.1(a): Sets the standard for wearing necklaces." },
    { question: "How many rings may be worn on each hand by a department member?", answer: "Two", options: ["One", "Two", "Three", "No limit"], reference: "GO 1400.4.1(c): Limits the number of rings that can be worn." },
    { question: "What is the maximum length for beard hair?", answer: "1/2 inch", options: ["1/4 inch", "1/2 inch", "1 inch", "No limit"], reference: "GO 1400.4.2(d): Specifies the maximum beard length." },
    { question: "Sideburns may not extend below the bottom of the earlobes.", answer: "True", options: ["True", "False"], reference: "GO 1400.4.2(c): Sets the standard for sideburn length." },
    { question: "The Class A uniform requires a long-sleeved shirt and tie.", answer: "True", options: ["True", "False"], reference: "GO 1401.3: Defines the components of the Class A uniform." },
    { question: "Members may combine their two daily breaks into one 30-minute break.", answer: "False", options: ["True", "False"], reference: "GO 1507.4: Specifies that breaks should not be combined unless approved." },
    { question: "Can a member request overtime pay for work performed during a meal break?", answer: "Yes", options: ["No", "Yes", "Only if it's a felony case", "Only if a supervisor is present"], reference: "GO 1507.4(d): Allows for overtime for work during meal periods." },
    { question: "A medical file shall be maintained separately from other personnel records.", answer: "True", options: ["True", "False"], reference: "GO 1511.4: Requires medical files to be kept separate and confidential." },
    { question: "Is a member on restricted duty allowed to work outside employment?", answer: "Yes, with department approval if it's not medically detrimental", options: ["No, it is prohibited", "Yes, without restrictions", "Yes, with department approval if it's not medically detrimental", "Only if the outside employment is sedentary"], reference: "GO 1514.4(g): Outlines conditions for outside employment while on restricted duty." },
    { question: "Which of the following would be an acceptable use of a badge?", answer: "Possessing your department-issued identification card while off-duty", options: ["For personal gain", "On a personal social media page", "In a personal email signature", "Possessing your department-issued identification card while off-duty"], reference: "GO 1000.4.1: Specifies acceptable uses of identification." },
    { question: "When should a fit test for PPE be repeated?", answer: "All of the above", options: ["If there is a change in the face piece", "If the user has significant weight change", "If the user has significant facial surgery", "All of the above"], reference: "GO 1404.6.1: Lists conditions requiring a repeat fit test." },
    { question: "Is it acceptable to use a personal cell phone to take photos of a crime scene?", answer: "No", options: ["Yes, if the quality is good", "Yes, if no department camera is available", "No", "Only for minor crimes"], reference: "GO 1001.5(e): Prohibits use of personal devices for evidentiary photos." },
    { question: "Tattoos on or above the neck are prohibited from being visible at any time.", answer: "True", options: ["True", "False"], reference: "GO 1400.4.4(a): Forbids visible tattoos on or above the neck." },
    { question: "Beards and goatees must be worn with a mustache.", answer: "True", options: ["True", "False"], reference: "GO 1400.4.2(d): Requires a mustache to be worn with a beard or goatee." },
    { question: "A member who is romantically dating another member can directly supervise them.", answer: "False", options: ["True", "False"], reference: "GO 1313.3: Prohibits supervisory relationships between romantically involved members." },
    { question: "Protected information can be released to other DPD members on a 'need to know' basis.", answer: "True", options: ["True", "False"], reference: "GO 1103.3: Governs the dissemination of protected information." },
    { question: "Can an officer provide an emergency escort for a civilian vehicle?", answer: "No, members are discouraged from providing emergency escorts", options: ["Yes, for any emergency", "No, members are discouraged from providing emergency escorts", "Only for childbirth", "Only with a supervisor's direct order"], reference: "GO 800.8.2: Discourages the escorting of civilian vehicles." },
    { question: "A drug screening can be required if an employee is involved in an incident that results in substantial property damage.", answer: "True", options: ["True", "False"], reference: "GO 1600.3(b)2: Allows for screening after incidents with substantial damage." },
    { question: "A critical incident stress debriefing is required for any officer involved in a shooting.", answer: "False, it is voluntary", options: ["True, it is mandatory", "False, it is voluntary", "False, it is not offered", "True, but only for fatal shootings"], reference: "GO 1604.4.1: States that participation in a debriefing is voluntary." },
    { question: "The Chief of Police reports to:", answer: "The City Manager", options: ["The Mayor", "The City Council", "The City Manager", "No one, the Chief has ultimate authority"], reference: "City of Denton Charter/Organizational Structure." },
    { question: "An officer's jurisdiction extends to all federal properties within the state.", answer: "False, it can be concurrent or proprietary", options: ["True", "False", "False, it can be concurrent or proprietary", "Only for traffic offenses"], reference: "General legal principles of jurisdiction." },
    { question: "When an officer makes an arrest outside their city limits, they are acting as a:", answer: "Peace officer for the State of Texas", options: ["Private citizen", "Federal agent", "Peace officer for the State of Texas", "Security guard"], reference: "GO 100.3.2: When outside city limits, authority comes from state law." },
    { question: "The Law Enforcement Code of Ethics requires an officer to keep their private life...", answer: "Unsullied as an example to all", options: ["Completely separate from their professional life", "Private and not subject to scrutiny", "Unsullied as an example to all", "In compliance with department regulations only"], reference: "Law Enforcement Code of Ethics" },
    { question: "What should an officer do if they receive an order they believe to be unlawful?", answer: "Respectfully state the conflict and request clarification", options: ["Obey the order without question", "Refuse the order and report it to internal affairs", "Respectfully state the conflict and request clarification", "Ask a peer for their opinion"], reference: "GO 1300.4: Provides steps for handling potentially unlawful orders." },
    { question: "Who is responsible for the overall operation of the department?", answer: "The Chief of Police", options: ["The Assistant Chief", "The City Manager", "The Chief of Police", "The Patrol Bureau Chief"], reference: "GO 101.4: Outlines the responsibilities of the Chief of Police." },
    { question: "The term 'Chain of Command' refers to:", answer: "The vertical lines of authority and responsibility", options: ["The order in which officers respond to a call", "The process for filing a grievance", "The vertical lines of authority and responsibility", "The department's organizational chart"], reference: "GO 200.5.1: Defines Chain of Command." },
    { question: "An officer can use a department logo on personal correspondence.", answer: "False", options: ["True", "False"], reference: "GO 1000.4.1: Prohibits use of department logos for personal reasons." },
    { question: "The term 'Probable Cause' is required for:", answer: "An arrest", options: ["A consensual encounter", "A temporary detention", "An arrest", "A field interview"], reference: "Legal standards of proof." },
    { question: "Which bureau is responsible for the Field Training Program?", answer: "Support Bureau", options: ["Patrol Bureau", "Support Bureau", "Investigations Bureau", "Administrative Services Bureau"], reference: "GO 200.3.4 & GO 523: FTO falls under the Training Division within the Support Bureau." },
    { question: "What is the department's philosophy regarding the use of authority?", answer: "To be used with reasonableness and temperance", options: ["To establish dominance in all encounters", "To be used with reasonableness and temperance", "To be used only as a last resort", "To be avoided whenever possible"], reference: "Philosophy of the Denton Police Department." },
    { question: "The value 'P' in P.R.I.D.E. stands for:", answer: "Professionalism", options: ["Pride", "Protection", "Professionalism", "Performance"], reference: "Department Values." },
    { question: "An officer's primary responsibility in any situation is:", answer: "The protection of life", options: ["The enforcement of laws", "The protection of property", "The protection of life", "The apprehension of suspects"], reference: "Law Enforcement Code of Ethics" },
    { question: "Can an officer accept a gratuity for performing their duties?", answer: "No", options: ["Yes, if it is under $20", "No", "Yes, if their supervisor approves", "Only during holidays"], reference: "GO 1300.3.2" },
    { question: "The department's organizational structure is based on:", answer: "A line and staff model", options: ["A military model", "A corporate model", "A line and staff model", "A flat hierarchy"], reference: "GO 200.2: Describes the line and staff structure." },
    { question: "What is the role of the Public Information Officer (PIO)?", answer: "To coordinate the release of information to the public and media", options: ["To investigate leaks to the media", "To approve all departmental reports", "To coordinate the release of information to the public and media", "To act as the Chief's spokesperson in all matters"], reference: "GO 700.5" },
    { question: "Can a member use department resources for political campaign activities?", answer: "No", options: ["Yes, if they are off-duty", "Yes, if the candidate is pro-police", "No", "Only if they reimburse the city"], reference: "GO 1314.4.1(d)" },
    { question: "An officer must report a change of address within what timeframe?", answer: "72 hours", options: ["24 hours", "48 hours", "72 hours", "One week"], reference: "GO 1511.3: Requires prompt notification of change of address." },
    { question: "The 'grapevine' is a recognized and approved method of communication in the department.", answer: "False", options: ["True", "False"], reference: "GO 1301.2: Discourages gossip and rumors." },
    { question: "Which of the following requires a 'Major Incident' notification?", answer: "An in-custody death", options: ["A non-injury vehicle accident", "A routine felony arrest", "An in-custody death", "A found property call"], reference: "GO 400.3: Lists criteria for major incident notification." },
    { question: "The Peer Support Team provides what kind of support?", answer: "Confidential emotional and psychological support", options: ["Legal advice", "Financial assistance", "Confidential emotional and psychological support", "Disciplinary representation"], reference: "GO 1604.2" }
        ],
        unit2: [
            
            ],
        unit3: [/* PLACEHOLDER: Add questions for General Orders Unit 3 here. */

        ],
        unit4: [/* PLACEHOLDER: Add questions for General Orders Unit 4 here. */

        ],
        unit5: [/* PLACEHOLDER: Add questions for General Orders Unit 5 here. */

        ],
        unit6: [/* PLACEHOLDER: Add questions for General Orders Unit 6 here. */

        ],
        unit7: [/* PLACEHOLDER: Add questions for General Orders Unit 7 here. */

        ],
        unit8: [/* PLACEHOLDER: Add questions for General Orders Unit 8 here. */

        ],
        unit9: [/* PLACEHOLDER: Add questions for General Orders Unit 9 here. */

        ],
        unit10: [/* PLACEHOLDER: Add questions for General Orders Unit 10 here. */

        ],
        unit11: [/* PLACEHOLDER: Add questions for General Orders Unit 11 here. */

        ],
        unit12: [/* Article 12 is repealed. No questions expected. */],
        unit14: [/* Article 14 is repealed. No questions expected. */],
        unit15: [/* QUESTIONS_UNIT15 */],
        unit17: [/* QUESTIONS_UNIT17 */],
    },
    tcole: [
        // Example: Add 300+ questions here. App will pick 250.
        { question: "TCOLE Sample Question 1: What is the capital of Texas?", answer: "Austin", options: ["Dallas", "Houston", "Austin", "San Antonio"], reference: "TCOLE Ref 1.1" },
        { question: "TCOLE Sample Question 2: True or False - The sky is blue.", answer: "True", options: ["True", "False"], reference: "TCOLE Ref 1.2" }
        // Add many more TCOLE questions here...
    ],
    texasConstitutions: {
        article1: [
            { question: "Texas Constitutions Sample Question Article 1: What is the Bill of Rights?", answer: "Guarantees fundamental rights and freedoms", options: ["Defines the powers of the legislature", "Guarantees fundamental rights and freedoms", "Establishes the court system", "Outlines the election process"], reference: "TX Const. Art. 1 Sec. 1" }
            // Add more questions for Article 1 here...
        ],
        article3: [/* Add questions for Article 3 here... */],
        article4: [/* Add questions for Article 4 here... */],
        article5: [/* Add questions for Article 5 here... */],
        article6: [/* Add questions for Article 6 here... */],
        article7: [/* Add questions for Article 7 here... */],
        article8: [/* Add questions for Article 8 here... */],
        article9: [/* Add questions for Article 9 here... */],
        article10: [/* Add questions for Article 10 here... */],
        article11: [/* Add questions for Article 11 here... */],
        article12: [/* Article 12 is repealed. No questions expected. */],
        article14: [/* Article 14 is repealed. No questions expected. */],
        article15: [/* Add questions for Article 15 here... */],
        article16: [/* Add questions for Article 16 here... */],
        article17: [/* Add questions for Article 17 here... */]
    },
    texasStatutes: {
        penalCode: [
            // { question: "Sample Penal Code Question?", answer: "Sample Answer", options: ["A", "B"], reference: "PC 1.01" }
        ],
        transportationCode: [],
        alcoholicBeverageCode: [],
        healthAndSafetyCode: [],
        familyCode: [],
        localGovernmentCode: [],
        codeOfCriminalProcedure: [
            { question: "Texas Statutes Sample Question 1: What does CCP stand for?", answer: "Code of Criminal Procedure", options: ["Criminal Code of Penalties", "Code of Criminal Procedure", "Constitution of Criminal Prosecution", "Civil Case Procedures"], reference: "TX CCP Art. 1.01" }
        ],
        educationCode: [],
        governmentCode: [],
        parksAndWildlifeCode: [],
        businessAndCommerceCode: [],
        propertyCode: []
        // Add more questions for each statute code here...
    },
    tpcaBestPractices: {
        useOfForce: [
            // { question: "Sample TPCA Use of Force Question?", answer: "Sample Answer", options: ["A", "B"], reference: "TPCA BP 1.1" }
        ],
        emergencyVehicleOperationAndPursuits: [],
        searchSeizureAndArrest: [],
        careCustodyAndRestraintOfPrisoners: [],
        domesticViolenceAndAgencyEmployeeDomesticConduct: [],
        offDutyConduct: [],
        selectionAndHiring: [],
        sexualHarassment: [],
        complaintAndInternalAffairsManagement: [],
        narcoticsSwatAndHighRiskWarrantService: [],
        dealingWithTheMentallyIllAndDevelopmentallyDisabled: [],
        propertyAndEvidenceManagement: []
    },
    BPOC: {
        // Data will be loaded from BPOC.json, structure will be:
        // week1: [{question: "...", answer: "...", ...}],
        // week2: [], 
        // ...
        // week21: []
    }
};

// Function to fetch and integrate external JSON data
async function loadExternalData() {
    try {
        const response = await fetch('../data/BPOC.json'); // Adjusted path
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const bpocData = await response.json();
        // Assuming BPOC.json's root is an object like: {"week1": [], "week2": [], ...}
        // And allReviewData.BPOC is already initialized as an empty object {}
        for (const weekKey in bpocData) {
            if (bpocData.hasOwnProperty(weekKey)) {
                allReviewData.BPOC[weekKey] = bpocData[weekKey];
            }
        }
        console.log("BPOC data loaded successfully into allReviewData.BPOC");
    } catch (error) {
        console.error("Error loading BPOC.json:", error);
        // Fallback or error handling: ensure allReviewData.BPOC exists
        if (!allReviewData.BPOC) {
            allReviewData.BPOC = {}; 
        }
        // Optionally populate with empty weeks if loading fails
        for (let i = 1; i <= 21; i++) {
            if (!allReviewData.BPOC[`week${i}`]) {
                allReviewData.BPOC[`week${i}`] = [];
            }
        }
        console.log("BPOC data initialized with empty weeks due to loading error.");
    }
}

// Call this function when the application initializes or when data is needed.
// For example, at the beginning of your script or before starting a quiz.
loadExternalData().then(() => {
    // You can now access allReviewData.BPOC with the loaded data
    // console.log(allReviewData.BPOC);
});
