import * as vscode from 'vscode';

interface TimezoneOption {
    label: string;
    description: string;
    value: string;
}

/**
 * Common timezones organized by region
 */
const TIMEZONE_OPTIONS: TimezoneOption[] = [
    // Special
    { label: '$(globe) Local (System Timezone)', description: 'Use your system timezone', value: 'local' },
    { label: '$(globe) UTC', description: 'Coordinated Universal Time', value: 'UTC' },

    // Asia
    { label: '$(location) Asia/Shanghai', description: 'China Standard Time (UTC+8)', value: 'Asia/Shanghai' },
    { label: '$(location) Asia/Tokyo', description: 'Japan Standard Time (UTC+9)', value: 'Asia/Tokyo' },
    { label: '$(location) Asia/Hong_Kong', description: 'Hong Kong Time (UTC+8)', value: 'Asia/Hong_Kong' },
    { label: '$(location) Asia/Singapore', description: 'Singapore Time (UTC+8)', value: 'Asia/Singapore' },
    { label: '$(location) Asia/Seoul', description: 'Korea Standard Time (UTC+9)', value: 'Asia/Seoul' },
    { label: '$(location) Asia/Kolkata', description: 'India Standard Time (UTC+5:30)', value: 'Asia/Kolkata' },
    { label: '$(location) Asia/Dubai', description: 'Gulf Standard Time (UTC+4)', value: 'Asia/Dubai' },
    { label: '$(location) Asia/Bangkok', description: 'Indochina Time (UTC+7)', value: 'Asia/Bangkok' },

    // Americas
    { label: '$(location) America/New_York', description: 'Eastern Time (UTC-5/-4)', value: 'America/New_York' },
    { label: '$(location) America/Chicago', description: 'Central Time (UTC-6/-5)', value: 'America/Chicago' },
    { label: '$(location) America/Denver', description: 'Mountain Time (UTC-7/-6)', value: 'America/Denver' },
    { label: '$(location) America/Los_Angeles', description: 'Pacific Time (UTC-8/-7)', value: 'America/Los_Angeles' },
    { label: '$(location) America/Toronto', description: 'Eastern Time Canada (UTC-5/-4)', value: 'America/Toronto' },
    { label: '$(location) America/Mexico_City', description: 'Central Time Mexico (UTC-6/-5)', value: 'America/Mexico_City' },
    { label: '$(location) America/Sao_Paulo', description: 'Brasília Time (UTC-3)', value: 'America/Sao_Paulo' },

    // Europe
    { label: '$(location) Europe/London', description: 'GMT/BST (UTC+0/+1)', value: 'Europe/London' },
    { label: '$(location) Europe/Paris', description: 'Central European Time (UTC+1/+2)', value: 'Europe/Paris' },
    { label: '$(location) Europe/Berlin', description: 'Central European Time (UTC+1/+2)', value: 'Europe/Berlin' },
    { label: '$(location) Europe/Moscow', description: 'Moscow Standard Time (UTC+3)', value: 'Europe/Moscow' },
    { label: '$(location) Europe/Istanbul', description: 'Turkey Time (UTC+3)', value: 'Europe/Istanbul' },
    { label: '$(location) Europe/Amsterdam', description: 'Central European Time (UTC+1/+2)', value: 'Europe/Amsterdam' },

    // Pacific & Oceania
    { label: '$(location) Australia/Sydney', description: 'Australian Eastern Time (UTC+10/+11)', value: 'Australia/Sydney' },
    { label: '$(location) Australia/Melbourne', description: 'Australian Eastern Time (UTC+10/+11)', value: 'Australia/Melbourne' },
    { label: '$(location) Pacific/Auckland', description: 'New Zealand Time (UTC+12/+13)', value: 'Pacific/Auckland' },

    // Africa & Middle East
    { label: '$(location) Africa/Cairo', description: 'Eastern European Time (UTC+2)', value: 'Africa/Cairo' },
    { label: '$(location) Africa/Johannesburg', description: 'South Africa Standard Time (UTC+2)', value: 'Africa/Johannesburg' },
];

/**
 * Show timezone selector and update configuration
 */
export async function selectTimezone(): Promise<void> {
    const config = vscode.workspace.getConfiguration('my-timestamp');
    const currentTimezone = config.get<string>('timezone', 'local');

    // Find current timezone in options
    const currentOption = TIMEZONE_OPTIONS.find(opt => opt.value === currentTimezone);

    const selected = await vscode.window.showQuickPick(TIMEZONE_OPTIONS, {
        placeHolder: `Current: ${currentOption?.label || currentTimezone}`,
        matchOnDescription: true,
        matchOnDetail: true
    });

    if (selected) {
        await config.update('timezone', selected.value, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Timezone changed to: ${selected.label}`);
    }
}
