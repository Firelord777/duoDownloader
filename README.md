# DuoDownloader
A Firefox add-on to download a list of all the vocabulary learned on a certain language in Duolingo.

# TO-DO
- Create a pop-up interface for the user
- Get the raw JSON data from the Duolingo API
- Develop options to parse the raw data to the following formats:
  - txt file
  - JSON file
  - csv file
  - Anki Cards 

- Make it manifest 3.0 compatible
- Create an icon for the extention
- Set an add-on id
- Add in Errorhandling for the JSON Fetcher (ERROR 404 -> Probably not logged in)
- Fetch Coursename from: https://www.duolingo.com/2017-06-30/users/944593992?fields=acquisitionSurveyReason,adsConfig,betaStatus,blockedUserIds,canUseModerationTools,classroomLeaderboardsEnabled,courses,creationDate,currentCourseId,email,emailAnnouncement,emailAssignment,emailAssignmentComplete,emailClassroomJoin,emailClassroomLeave,emailEditSuggested,emailEventsDigest,emailFollow,emailPass,emailPromotion,emailResearch,emailWeeklyProgressReport,emailSchoolsAnnouncement,emailSchoolsNewsletter,emailSchoolsProductUpdate,emailSchoolsPromotion,emailStreamPost,emailVerified,emailWeeklyReport,enableMicrophone,enableSoundEffects,enableSpeaker,experiments%7Bcourses_en_te_v1,courses_xh_en_experiment,gen_sess_web_underline_mistake,gweb_active_xp_boost_widget,gweb_capstone_xp_boost_reward,gweb_improve_onboarding_latency,gweb_league_stats_v2,gweb_migrate_desktop_app_drawers_v2,gweb_migrate_email_verified_drawers,gweb_migrate_marketing_opt_in_drawers,gweb_migrate_streak_repair_drawers,gweb_mobile_web_to_app_conversion,gweb_quests_tab,gweb_redesigned_page_footer,gweb_refill_sf_at_milestone,gweb_remove_character_quests,gweb_streak_society,gweb_update_profile_layout,minfra_web_stripe_setup_intent,path_web_sections,sfeat_web_legendary_per_node_dev,spack_web_autorenew_language,spack_web_d12_reminder_2,spack_web_family_plan_first,spack_web_fp_init_page,spack_web_pf_no_ads_first,spack_web_purchase_flow_refactor,spack_web_registration_softwall,spack_web_super_video_promo,tsl_child_user_leaderboard,web_dark_mode_v2%7D,facebookId,fromLanguage,gemsConfig,globalAmbassadorStatus,googleId,hasFacebookId,hasGoogleId,hasPlus,health,id,inviteURL,joinedClassroomIds,lastResurrectionTimestamp,lastStreak%7BisAvailableForRepair,length%7D,learningLanguage,lingots,location,monthlyXp,name,observedClassroomIds,optionalFeatures,persistentNotifications,picture,plusDiscounts,practiceReminderSettings,privacySettings,referralInfo,rewardBundles,roles,sessionCount,streak,streakData%7BcurrentStreak,previousStreak%7D,timezone,timezoneOffset,totalXp,trackingProperties,username,webNotificationIds,weeklyXp,xpGains,xpGoal,zhTw,currentCourse&_=1689181485294
