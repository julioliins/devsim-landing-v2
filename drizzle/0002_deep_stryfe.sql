CREATE TABLE `careers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(255),
	`color` varchar(20),
	`order` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `careers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `curiosities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`careerId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`category` varchar(100),
	`icon` varchar(255),
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `curiosities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `npcs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`careerId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`role` varchar(100) NOT NULL,
	`avatar` varchar(255),
	`personality` text,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `npcs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session_summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`totalTasks` int DEFAULT 0,
	`completedTasks` int DEFAULT 0,
	`totalPoints` int DEFAULT 0,
	`earnedPoints` int DEFAULT 0,
	`topicsLearned` longtext,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `session_summaries_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_summaries_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
CREATE TABLE `simulation_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`careerId` int NOT NULL,
	`methodology` enum('agile','waterfall') NOT NULL,
	`status` enum('active','paused','completed','abandoned') DEFAULT 'active',
	`score` int,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `simulation_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `simulation_tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`npcId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` longtext,
	`methodology` enum('agile','waterfall') NOT NULL,
	`status` enum('pending','in_progress','completed','failed') DEFAULT 'pending',
	`difficulty` enum('easy','medium','hard') DEFAULT 'medium',
	`points` int DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `simulation_tasks_id` PRIMARY KEY(`id`)
);
