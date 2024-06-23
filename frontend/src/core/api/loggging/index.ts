"use server";

import fs from "fs";
import path from "path";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { LogsInterface } from "@/core/types";

const BASEURLLOGS = process.env.NEXT_PUBLIC_LOGS_URL;

export const saveLogsInFile = async () => {
  try {
    const logs = await getLogs();

    if (!logs || logs.length === 0) return;

    const filePath = path.resolve(process.cwd(), "logs.json");
    const data = JSON.stringify(logs, null, 2);
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.error(error);
    throw new Error("Error saving logs to file");
  }
};

/**
 * Fetches logs from the server.
 * @returns A Promise that resolves to the logs data, or null if the response status is 204.
 * @throws An error if there is an issue fetching the logs.
 */
export const getLogs = async () => {
  try {
    const response = await fetch(`${BASEURLLOGS}`);
    if (!response.ok) throw new Error("Error fetching logs");
    if (response.status === 404) return [];
    return response.status !== 204 ? await response.json() : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves a log by its ID.
 * @param id - The ID of the log to retrieve.
 * @returns A Promise that resolves to the retrieved log data.
 * @throws An error if there was an issue fetching the log.
 */
export const getLog = async (id: string) => {
  try {
    const response = await fetch(`${BASEURLLOGS}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching log");
  }
};
